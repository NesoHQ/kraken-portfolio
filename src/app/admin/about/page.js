'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Btn, Field, Input, Textarea, useToast } from '@/components/admin/ui';

const DEFAULT = {
  name: 'Iqbal Hossain', title: 'Senior Software Engineer',
  bio: ['', ''], email: 'zafar.iq3089@gmail.com',
  phone: '+880 1403229479', location: 'Dhaka-1230, Bangladesh',
  linkedin: 'https://linkedin.com/in/geomachine',
  github: 'https://github.com/geomachine',
  githubOrg: 'https://github.com/nesohq',
  services: [
    { title: 'Backend Engineering', text: '', icon: 'Server' },
    { title: 'Cloud & DevOps', text: '', icon: 'Globe' },
  ],
  techStack: [
    { label: 'Languages', value: 'Golang, TypeScript, Python, Bash' },
  ],
};

export default function AdminAboutPage() {
  const [data, setData] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(j => {
      if (j.data) setData(j.data);
      setLoading(false);
    });
  }, []);

  const save = async (override) => {
    const raw = override ?? data;
    const payload = {
      name: raw.name || '',
      title: raw.title || '',
      avatar: raw.avatar || '',
      bio: (raw.bio || []).map(p => String(p || '')),
      email: raw.email || '',
      phone: raw.phone || '',
      location: raw.location || '',
      linkedin: raw.linkedin || '',
      github: raw.github || '',
      githubOrg: raw.githubOrg || '',
      services: (raw.services || []).map(s => ({
        title: s.title || '', text: s.text || '', icon: s.icon || '',
      })),
      techStack: (raw.techStack || []).map(t => ({
        label: t.label || '', value: t.value || '',
      })),
    };
    setSaving(true);
    const res = await fetch('/api/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) toast.show('Changes saved.');
    else toast.show('Failed to save.', 'error');
  };

  const set = (key, val) => setData(d => ({ ...d, [key]: val }));

  const deleteItem = (key, i) => {
    const next = { ...data, [key]: data[key].filter((_, j) => j !== i) };
    setData(next);
    save(next);
  };

  if (loading) return <div className="py-16 text-center text-muted"><Loader2 size={24} className="animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      {toast.ToastEl}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-signature font-bold text-foreground">About</h1>
          <p className="text-sm text-muted">Profile, contact info, services & tech stack.</p>
        </div>
        <Btn onClick={save} disabled={saving}>
          {saving && <Loader2 size={14} className="animate-spin" />}
          Save Changes
        </Btn>
      </div>

      {/* Identity */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Identity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" required><Input value={data.name} onChange={e => set('name', e.target.value)} /></Field>
          <Field label="Title / Role" required><Input value={data.title} onChange={e => set('title', e.target.value)} /></Field>
        </div>
        <Field label="Avatar URL"><Input value={data.avatar || ''} onChange={e => set('avatar', e.target.value)} placeholder="/astha.jpeg" /></Field>
      </section>

      {/* Bio */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Bio Paragraphs</h2>
        {(data.bio || []).map((p, i) => (
          <div key={i} className="flex gap-2">
            <Textarea value={p} rows={2} onChange={e => {
              const bio = [...data.bio]; bio[i] = e.target.value; set('bio', bio);
            }} placeholder={`Paragraph ${i + 1}`} className="flex-1" />
            <button type="button" onClick={() => deleteItem('bio', i)} className="text-muted hover:text-red-500 transition-colors shrink-0 mt-1"><Trash2 size={15} /></button>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => set('bio', [...(data.bio || []), ''])}><Plus size={14} /> Add Paragraph</Btn>
      </section>

      {/* Contact */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Contact Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email"><Input value={data.email} onChange={e => set('email', e.target.value)} /></Field>
          <Field label="Phone"><Input value={data.phone} onChange={e => set('phone', e.target.value)} /></Field>
          <Field label="Location"><Input value={data.location} onChange={e => set('location', e.target.value)} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="LinkedIn"><Input value={data.linkedin} onChange={e => set('linkedin', e.target.value)} /></Field>
          <Field label="GitHub"><Input value={data.github} onChange={e => set('github', e.target.value)} /></Field>
          <Field label="GitHub Org"><Input value={data.githubOrg} onChange={e => set('githubOrg', e.target.value)} /></Field>
        </div>
      </section>

      {/* Services */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Services</h2>
        {(data.services || []).map((s, i) => (
          <div key={i} className="border border-card-border p-4 space-y-3 relative">
            <button type="button" onClick={() => deleteItem('services', i)} className="absolute top-3 right-3 text-muted hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><Input value={s.title} onChange={e => { const sv = [...data.services]; sv[i] = { ...sv[i], title: e.target.value }; set('services', sv); }} /></Field>
              <Field label="Icon"><Input value={s.icon} onChange={e => { const sv = [...data.services]; sv[i] = { ...sv[i], icon: e.target.value }; set('services', sv); }} placeholder="Server, Globe..." /></Field>
            </div>
            <Field label="Description"><Textarea value={s.text} rows={2} onChange={e => { const sv = [...data.services]; sv[i] = { ...sv[i], text: e.target.value }; set('services', sv); }} /></Field>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => set('services', [...(data.services || []), { title: '', text: '', icon: '' }])}><Plus size={14} /> Add Service</Btn>
      </section>

      {/* Tech Stack */}
      <section className="bg-card border-2 border-card-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Tech Stack</h2>
        {(data.techStack || []).map((t, i) => (
          <div key={i} className="grid grid-cols-[140px_1fr_auto] gap-3 items-end">
            <Field label={i === 0 ? 'Category' : undefined}>
              <Input value={t.label} onChange={e => { const ts = [...data.techStack]; ts[i] = { ...ts[i], label: e.target.value }; set('techStack', ts); }} placeholder="e.g. Languages" />
            </Field>
            <Field label={i === 0 ? 'Technologies' : undefined}>
              <Input value={t.value} onChange={e => { const ts = [...data.techStack]; ts[i] = { ...ts[i], value: e.target.value }; set('techStack', ts); }} placeholder="Golang, TypeScript..." />
            </Field>
            <button type="button" onClick={() => deleteItem('techStack', i)} className="text-muted hover:text-red-500 transition-colors mb-2 shrink-0"><Trash2 size={14} /></button>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => set('techStack', [...(data.techStack || []), { label: '', value: '' }])}><Plus size={14} /> Add Row</Btn>
      </section>
    </div>
  );
}
