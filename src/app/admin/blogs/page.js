'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Table, Modal, ConfirmDialog, Btn, Field, Input, Textarea, SearchInput, Pagination, Badge, useToast } from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title:    z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  excerpt:  z.string().min(1, 'Required'),
  content:  z.string().min(1, 'Required'),
  tags:     z.string().optional(),
  image:    z.string().optional(),
});

function BlogModal({ open, onClose, selected, onSaved, toast }) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!open) return;
    setApiError('');

    if (!selected) {
      reset({ title: '', category: 'General', excerpt: '', content: '', tags: '', image: '' });
      return;
    }

    const fill = (blog) => reset({
      title: blog.title || '', category: blog.category || '',
      excerpt: blog.excerpt || '', content: blog.content || '',
      tags: blog.tags?.join(', ') || '', image: blog.image || '',
    });

    // The list omits `content`, so fetch the full post to populate the editor.
    fill(selected);
    if (selected.content === undefined) {
      setFetching(true);
      fetch(`/api/blogs/${selected._id}`)
        .then(r => r.json())
        .then(j => { if (j.data) fill(j.data); })
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [open, selected, reset]);

  const onSubmit = async (data) => {
    setLoading(true); setApiError('');
    const payload = { ...data, tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    try {
      const res = await fetch(selected ? `/api/blogs/${selected._id}` : '/api/blogs', {
        method: selected ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) { setApiError(json.error || 'Failed'); return; }
      onSaved(json.data, !!selected);
      toast.show(selected ? 'Blog updated.' : 'Blog created.');
      onClose();
    } catch { setApiError('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={selected ? 'Edit Blog Post' : 'New Blog Post'} wide>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Title" error={errors.title?.message} required>
          <Input {...register('title')} placeholder="Post title" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" error={errors.category?.message} required>
            <Input {...register('category')} placeholder="e.g. Engineering" />
          </Field>
          <Field label="Tags">
            <Input {...register('tags')} placeholder="tag1, tag2, tag3" />
          </Field>
        </div>
        <Field label="Cover Image">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} folder="blogs" />
            )}
          />
        </Field>
        <Field label="Excerpt" error={errors.excerpt?.message} required>
          <Textarea {...register('excerpt')} rows={2} placeholder="Short summary shown on the blog list" />
        </Field>
        <Field label="Content" error={errors.content?.message} required>
          {fetching ? (
            <div className="py-12 text-center text-muted border-2 border-dashed border-card-border">
              <Loader2 size={18} className="animate-spin mx-auto" />
            </div>
          ) : (
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <MarkdownEditor value={field.value} onChange={field.onChange} />
              )}
            />
          )}
        </Field>
        {apiError && <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2">{apiError}</p>}
        <div className="flex justify-end gap-3 pt-2 border-t border-dashed border-card-border">
          <Btn variant="ghost" type="button" onClick={onClose} disabled={loading}>Cancel</Btn>
          <Btn type="submit" disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin" />}
            {selected ? 'Update' : 'Create'}
          </Btn>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const toast = useToast();

  const load = useCallback((p = 1, query = q) => {
    setLoading(true);
    const params = new URLSearchParams({ page: p, limit: 10, ...(query && { q: query }) });
    fetch(`/api/blogs?${params}`).then(r => r.json()).then(j => {
      const d = j.data;
      setBlogs(d?.items || d || []);
      setTotal(d?.total ?? (d?.length ?? 0));
      setPages(d?.pages ?? 1);
      setPage(p);
      setLoading(false);
    });
  }, [q]);

  useEffect(() => { load(1); }, []);

  const handleSearch = (val) => {
    setQ(val);
    const params = new URLSearchParams({ page: 1, limit: 10, ...(val && { q: val }) });
    setLoading(true);
    fetch(`/api/blogs?${params}`).then(r => r.json()).then(j => {
      const d = j.data;
      setBlogs(d?.items || d || []);
      setTotal(d?.total ?? (d?.length ?? 0));
      setPages(d?.pages ?? 1);
      setPage(1);
      setLoading(false);
    });
  };

  const handleSaved = (blog, isEdit) => {
    if (isEdit) setBlogs(prev => prev.map(b => b._id === blog._id ? blog : b));
    else load(1);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/blogs/${deleteId}`, { method: 'DELETE' });
    setBlogs(prev => prev.filter(b => b._id !== deleteId));
    setDeleteId(null); setDeleting(false);
    toast.show('Blog deleted.');
  };

  const columns = [
    {
      header: 'Title', key: 'title',
      render: (v, row) => (
        <div className="flex items-center gap-3">
          {row.image
            ? <img src={row.image} alt={v} className="w-10 h-8 object-cover border border-card-border shrink-0" />
            : <div className="w-10 h-8 border border-card-border bg-primary-light shrink-0" />
          }
          <span className="font-bold">{v}</span>
        </div>
      ),
    },
    { header: 'Category', key: 'category', render: (v) => <Badge>{v}</Badge> },
    { header: 'Tags', key: 'tags', render: (v) => v?.length ? v.slice(0, 3).map(t => <Badge key={t} className="mr-1">{t}</Badge>) : '—' },
    { header: 'Date', key: 'createdAt', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
  ];

  return (
    <div>
      {toast.ToastEl}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-signature font-bold text-foreground">Blogs</h1>
          <p className="text-sm text-muted">{total} post{total !== 1 ? 's' : ''}</p>
        </div>
        <Btn onClick={() => { setSelected(null); setModalOpen(true); }}>
          <Plus size={15} /> New Post
        </Btn>
      </div>

      <div className="bg-card border-2 border-dashed border-card-border">
        <div className="px-4 py-3 border-b-2 border-dashed border-card-border">
          <SearchInput value={q} onChange={handleSearch} placeholder="Search by title, category, tag..." className="max-w-sm" />
        </div>
        <Table
          columns={columns} data={blogs} loading={loading}
          onEdit={(b) => { setSelected(b); setModalOpen(true); }}
          onDelete={(b) => setDeleteId(b._id)}
          emptyText="No blog posts yet."
        />
        <Pagination page={page} pages={pages} onPage={(p) => load(p)} />
      </div>

      <BlogModal open={modalOpen} onClose={() => setModalOpen(false)} selected={selected} onSaved={handleSaved} toast={toast} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
