'use client';

import { useRef, useState } from 'react';
import { Upload, Link, X, Loader2, FileText } from 'lucide-react';

/**
 * FileUpload — paste a URL or upload a document (e.g. a PDF resume).
 * Like ImageUpload, but previews a filename link instead of an <img>.
 * Props:
 *   value    {string}              current file URL
 *   onChange {(url: string) => void}
 *   folder   {string}              storage folder ('resume')
 *   accept   {string}              input accept attr (default '.pdf,application/pdf')
 *   hint     {string}              small helper text under the drop zone
 */
export function FileUpload({ value, onChange, folder = 'uploads', accept = '.pdf,application/pdf', hint = 'PDF — max 10 MB' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');
  const [tab, setTab]             = useState('file'); // 'url' | 'file'
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      const res  = await fetch('/api/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      onChange(json.data.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {/* Tab switcher */}
      <div className="flex border-2 border-dashed border-card-border overflow-hidden">
        {[['file', 'Upload File', Upload], ['url', 'Paste URL', Link]].map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
              tab === key ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
            }`}
          >
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* URL input */}
      {tab === 'url' && (
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/resume.pdf"
          className="w-full bg-background border-2 border-dashed border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted"
        />
      )}

      {/* File drop zone */}
      {tab === 'file' && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="relative border-2 border-dashed border-card-border hover:border-foreground transition-colors cursor-pointer bg-background flex flex-col items-center justify-center gap-2 py-6 text-muted hover:text-foreground"
        >
          {uploading
            ? <Loader2 size={20} className="animate-spin" />
            : <Upload size={20} />
          }
          <span className="text-xs font-bold tracking-widest uppercase">
            {uploading ? 'Uploading…' : 'Drop file or click to browse'}
          </span>
          <span className="text-[10px] opacity-50">{hint}</span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={11} /> {error}
        </p>
      )}

      {/* Preview — filename link */}
      {value && (
        <div className="flex items-center gap-2 border-2 border-dashed border-card-border bg-primary-light px-3 py-2">
          <FileText size={14} className="text-muted shrink-0" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground truncate hover:underline flex-1">
            {value.split('/').pop()}
          </a>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-muted hover:text-red-500 transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
