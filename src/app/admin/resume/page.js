'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Btn, Field, Input, Textarea, useToast } from '@/components/admin/ui';

const DEFAULT_RESUME = {
  experience: [
    { title: 'Senior Software Engineer & Backend Lead', company: 'Zalmi Technology', period: 'Jan 2026 — Present', points: [''] },
  ],
  infraProjects: [
    { title: 'Private Hybrid Cloud — NesoHQ', period: '2022 — Present', text: '' },
  ],
  skills: [
    { category: 'Languages', tags: ['Golang', 'TypeScript'] },
  ],
};

export default function AdminResumePage() {
  const [data, setData] = useState(DEFAULT_RESUME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/resume').then(r => r.json()).then(j => {
      if (j.data) setData(j.data);
      setLoading(false);
    });
  }, []);

  const save = async (override) => {
    const raw = override ?? data;
    // Sanitize: only keep plain serializable fields
    const payload = {
      experience: (raw.experience || []).map(e => ({
        title: e.title || '',
        company: e.company || '',
        period: e.period || '',
        points: (e.points || []).map(p => String(p || '')),
      })),
      infraProjects: (raw.infraProjects || []).map(p => ({
        title: p.title || '',
        period: p.period || '',
        text: p.text || '',
      })),
      skills: (raw.skills || []).map(s => ({
        category: s.category || '',
        tags: (s.tags || []).map(t => String(t || '')),
      })),
    };
    setSaving(true);
    const res = await fetch('/api/resume', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) toast.show('Saved.');
    else toast.show('Failed to save.', 'error');
  };

  // Delete an item from a list key, persist immediately
  const deleteItem = (key, i) => {
    const next = { ...data, [key]: data[key].filter((_, j) => j !== i) };
    setData(next);
    save(next);
  };

  const setExp = (i, key, val) => {
    const exp = [...data.experience]; exp[i] = { ...exp[i], [key]: val };
    setData(d => ({ ...d, experience: exp }));
  };
  const setPoint = (ei, pi, val) => {
    const exp = [...data.experience]; const pts = [...exp[ei].points]; pts[pi] = val;
    exp[ei] = { ...exp[ei], points: pts }; setData(d => ({ ...d, experience: exp }));
  };
  const setProj = (i, key, val) => {
    const proj = [...data.infraProjects]; proj[i] = { ...proj[i], [key]: val };
    setData(d => ({ ...d, infraProjects: proj }));
  };
  const setSkill = (i, key, val) => {
    const skills = [...data.skills]; skills[i] = { ...skills[i], [key]: val };
    setData(d => ({ ...d, skills }));
  };

  if (loading) return <div className="py-16 text-center text-muted"><Loader2 size={24} className="animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      {toast.ToastEl}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-signature font-bold text-foreground">Resume</h1>
          <p className="text-sm text-muted">Experience, projects & skills.</p>
        </div>
        <Btn onClick={save} disabled={saving}>
          {saving && <Loader2 size={14} className="animate-spin" />}
          Save Changes
        </Btn>
      </div>

      {/* Experience */}
      <section className="bg-card border-2 border-card-border p-6 space-y-6">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Work Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="border border-card-border p-4 space-y-3 relative">
            <button type="button" onClick={() => deleteItem('experience', i)} className="absolute top-3 right-3 text-muted hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Job Title"><Input value={exp.title} onChange={e => setExp(i, 'title', e.target.value)} /></Field>
              <Field label="Company"><Input value={exp.company} onChange={e => setExp(i, 'company', e.target.value)} /></Field>
              <Field label="Period"><Input value={exp.period} onChange={e => setExp(i, 'period', e.target.value)} placeholder="Jan 2026 — Present" /></Field>
            </div>
            <Field label="Bullet Points">
              <div className="space-y-2">
                {exp.points.map((pt, pi) => (
                  <div key={pi} className="flex gap-2">
                    <Input value={pt} onChange={e => setPoint(i, pi, e.target.value)} placeholder={`Point ${pi + 1}`} className="flex-1" />
                    <button type="button" onClick={() => setExp(i, 'points', exp.points.filter((_, j) => j !== pi))} className="text-muted hover:text-red-500 transition-colors shrink-0"><Trash2 size={14} /></button>
                  </div>
                ))}
                <Btn variant="ghost" onClick={() => setExp(i, 'points', [...exp.points, ''])}><Plus size={12} /> Add Point</Btn>
              </div>
            </Field>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => setData(d => ({ ...d, experience: [...d.experience, { title: '', company: '', period: '', points: [''] }] }))}>
          <Plus size={14} /> Add Experience
        </Btn>
      </section>

      {/* Infra Projects */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Cloud & Infra Projects</h2>
        {data.infraProjects.map((proj, i) => (
          <div key={i} className="border border-card-border p-4 space-y-3 relative">
            <button type="button" onClick={() => deleteItem('infraProjects', i)} className="absolute top-3 right-3 text-muted hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><Input value={proj.title} onChange={e => setProj(i, 'title', e.target.value)} /></Field>
              <Field label="Period"><Input value={proj.period} onChange={e => setProj(i, 'period', e.target.value)} /></Field>
            </div>
            <Field label="Description"><Textarea value={proj.text} rows={2} onChange={e => setProj(i, 'text', e.target.value)} /></Field>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => setData(d => ({ ...d, infraProjects: [...d.infraProjects, { title: '', period: '', text: '' }] }))}>
          <Plus size={14} /> Add Project
        </Btn>
      </section>

      {/* Skills */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Skills</h2>
        {data.skills.map((group, i) => (
          <div key={i} className="grid grid-cols-[160px_1fr_auto] gap-3 items-end">
            <Field label={i === 0 ? 'Category' : undefined}>
              <Input value={group.category} onChange={e => setSkill(i, 'category', e.target.value)} placeholder="e.g. Languages" />
            </Field>
            <Field label={i === 0 ? 'Tags (comma separated)' : undefined}>
              <Input value={group.tags?.join(', ')} onChange={e => setSkill(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="Golang, TypeScript, Python..." />
            </Field>
            <button type="button" onClick={() => deleteItem('skills', i)} className="text-muted hover:text-red-500 transition-colors mb-2 shrink-0"><Trash2 size={14} /></button>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => setData(d => ({ ...d, skills: [...d.skills, { category: '', tags: [] }] }))}>
          <Plus size={14} /> Add Skill Group
        </Btn>
      </section>
    </div>
  );
}
