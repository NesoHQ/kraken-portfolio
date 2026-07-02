import { Pool } from 'pg';

// ---------------------------------------------------------------------------
// Connection — a single pooled client, cached across hot-reloads / lambdas.
// ---------------------------------------------------------------------------
const cached = global.pgCache ?? { pool: null, ready: null };
global.pgCache = cached;

function getPool() {
  if (cached.pool) return cached.pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('Please define DATABASE_URL in .env.local');
  cached.pool = new Pool({ connectionString });
  return cached.pool;
}

// Every document table shares the same shape: a JSONB `data` blob plus an
// id and timestamps. Storing the whole document in JSONB keeps the schemaless
// flexibility we had with MongoDB while running on Postgres.
const TABLES = ['about', 'resume', 'blogs', 'contacts', 'projects'];

async function ensureSchema() {
  const pool = getPool();
  await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
  for (const table of TABLES) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data       JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
  }
  await pool.query(`CREATE INDEX IF NOT EXISTS blogs_created_at_idx    ON blogs (created_at DESC)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS projects_order_idx      ON projects (((data->>'order')::int), created_at DESC)`);
}

// Call before any query. Mirrors the old `connectDB()` entry point so routes
// keep a single, familiar "make sure the DB is reachable" call.
export default async function connectDB() {
  if (!cached.ready) {
    cached.ready = ensureSchema().catch((e) => {
      cached.ready = null;
      throw e;
    });
  }
  await cached.ready;
  return getPool();
}

export async function query(text, params) {
  const pool = getPool();
  return pool.query(text, params);
}

// Flatten a table row into the document shape the frontend expects, where the
// id surfaces as `_id` (as it did with Mongo) and timestamps sit alongside the
// JSONB payload.
export function rowToDoc(row) {
  if (!row) return null;
  return { _id: row.id, ...row.data, createdAt: row.created_at, updatedAt: row.updated_at };
}

function stripMeta(doc) {
  // Never let client-supplied id/timestamps leak into the JSONB blob.
  const { _id, id, createdAt, updatedAt, ...data } = doc ?? {};
  return data;
}

// ---------------------------------------------------------------------------
// Generic JSONB document helpers
// ---------------------------------------------------------------------------

export async function insertDoc(table, doc) {
  const { rows } = await query(
    `INSERT INTO ${table} (data) VALUES ($1::jsonb) RETURNING *`,
    [JSON.stringify(stripMeta(doc))]
  );
  return rowToDoc(rows[0]);
}

export async function findById(table, id) {
  if (!isUuid(id)) return null;
  const { rows } = await query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return rowToDoc(rows[0]);
}

// Merge `patch` into the existing JSONB (top-level keys, like Mongo's $set).
export async function updateById(table, id, patch) {
  if (!isUuid(id)) return null;
  const { rows } = await query(
    `UPDATE ${table}
       SET data = data || $2::jsonb, updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [id, JSON.stringify(stripMeta(patch))]
  );
  return rowToDoc(rows[0]);
}

export async function deleteById(table, id) {
  if (!isUuid(id)) return null;
  const { rows } = await query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]);
  return rowToDoc(rows[0]);
}

export async function findMany(table, { where = '', params = [], orderBy = 'created_at DESC', limit, offset, omit } = {}) {
  const select = omit ? `id, data - '${omit}' AS data, created_at, updated_at` : '*';
  let sql = `SELECT ${select} FROM ${table}`;
  if (where) sql += ` WHERE ${where}`;
  if (orderBy) sql += ` ORDER BY ${orderBy}`;
  const p = [...params];
  if (limit != null)  { sql += ` LIMIT $${p.length + 1}`;  p.push(limit); }
  if (offset != null) { sql += ` OFFSET $${p.length + 1}`; p.push(offset); }
  const { rows } = await query(sql, p);
  return rows.map(rowToDoc);
}

export async function countDocs(table, where = '', params = []) {
  const sql = `SELECT COUNT(*)::int AS n FROM ${table}` + (where ? ` WHERE ${where}` : '');
  const { rows } = await query(sql, params);
  return rows[0].n;
}

// about/resume are singletons: one row holding the whole document. Read the
// most recently updated row and prune any stragglers.
export async function getSingleton(table) {
  const { rows } = await query(`SELECT * FROM ${table} ORDER BY updated_at DESC`);
  if (rows.length > 1) {
    const keep = rows[0].id;
    await query(`DELETE FROM ${table} WHERE id <> $1`, [keep]);
  }
  return rowToDoc(rows[0]);
}

// Update the singleton row (merging top-level keys), creating it if absent.
export async function upsertSingleton(table, patch) {
  const existing = await getSingleton(table);
  if (existing) return updateById(table, existing._id, patch);
  return insertDoc(table, patch);
}

function isUuid(v) {
  return typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}
