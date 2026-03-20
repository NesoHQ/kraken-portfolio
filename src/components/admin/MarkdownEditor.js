'use client';

import { useRef, useState, useCallback } from 'react';
import { Bold, Heading2, Heading3, List, ListOrdered, Link, Code, Quote, Minus, Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Lightweight markdown editor with toolbar + live preview toggle.
 * Props: value, onChange
 */
export function MarkdownEditor({ value = '', onChange }) {
  const [preview, setPreview] = useState(false);
  const ref = useRef(null);

  const wrap = useCallback((before, after = before, placeholder = 'text') => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const sel   = value.slice(start, end) || placeholder;
    const next  = value.slice(0, start) + before + sel + after + value.slice(end);
    onChange(next);
    // restore cursor after React re-render
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + sel.length);
    });
  }, [value, onChange]);

  const insertLine = useCallback((prefix) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length);
    });
  }, [value, onChange]);

  const insertBlock = useCallback((text) => {
    const el = ref.current;
    if (!el) return;
    const pos  = el.selectionStart;
    const pre  = value.slice(0, pos);
    const post = value.slice(pos);
    const next = pre + (pre.endsWith('\n') || pre === '' ? '' : '\n') + text + '\n' + post;
    onChange(next);
    requestAnimationFrame(() => el.focus());
  }, [value, onChange]);

  const tools = [
    { icon: Heading2,     title: 'Heading 2',      action: () => insertLine('## ') },
    { icon: Heading3,     title: 'Heading 3',      action: () => insertLine('### ') },
    { sep: true },
    { icon: Bold,         title: 'Bold',           action: () => wrap('**', '**', 'bold text') },
    { icon: Code,         title: 'Inline code',    action: () => wrap('`', '`', 'code') },
    { sep: true },
    { icon: List,         title: 'Bullet list',    action: () => insertLine('- ') },
    { icon: ListOrdered,  title: 'Numbered list',  action: () => insertLine('1. ') },
    { icon: Quote,        title: 'Blockquote',     action: () => insertLine('> ') },
    { sep: true },
    { icon: Link,         title: 'Link',           action: () => wrap('[', '](https://)', 'link text') },
    { icon: Minus,        title: 'Divider',        action: () => insertBlock('\n---') },
  ];

  return (
    <div className="border-2 border-dashed border-card-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b-2 border-dashed border-card-border bg-background flex-wrap">
        {tools.map((t, i) =>
          t.sep
            ? <span key={i} className="w-px h-4 bg-card-border mx-1" />
            : (
              <button
                key={i} type="button" title={t.title}
                onClick={t.action}
                className="p-1.5 text-muted hover:text-foreground hover:bg-primary-light transition-colors"
              >
                <t.icon size={13} />
              </button>
            )
        )}
        {/* Preview toggle */}
        <button
          type="button"
          onClick={() => setPreview(p => !p)}
          title={preview ? 'Edit' : 'Preview'}
          className={`ml-auto flex items-center gap-1 px-2 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors ${
            preview ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
          }`}
        >
          {preview ? <EyeOff size={11} /> : <Eye size={11} />}
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="min-h-[280px] p-4 bg-background overflow-auto prose-area">
          <MarkdownContent content={value} />
        </div>
      ) : (
        <textarea
          ref={ref}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={16}
          placeholder="Write your post in Markdown...&#10;&#10;## Heading&#10;**bold**, `code`&#10;&#10;- bullet list&#10;1. numbered list&#10;&#10;[link text](https://example.com)"
          className="w-full bg-background px-4 py-3 text-sm text-foreground outline-none resize-y font-mono leading-relaxed placeholder:text-muted min-h-[280px]"
          spellCheck={false}
        />
      )}
    </div>
  );
}

/**
 * Renders markdown content with GFM support and link highlighting.
 * Used in both admin preview and the public blog detail view.
 */
export function MarkdownContent({ content = '' }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-3xl font-signature font-bold text-foreground mt-8 mb-4 pb-2 border-b-2 border-dashed border-card-border">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-signature font-bold text-foreground mt-7 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-signature font-bold text-foreground mt-6 mb-2">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h4>,
        p:  ({ children }) => <p className="text-muted leading-relaxed mb-4 text-base">{children}</p>,
        a:  ({ href, children }) => (
          <a
            href={href} target="_blank" rel="noopener noreferrer"
            className="text-foreground font-semibold underline underline-offset-4 decoration-dashed hover:decoration-solid transition-all duration-150 break-words"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
        em:     ({ children }) => <span className="font-semibold text-foreground">{children}</span>,
        ul: ({ children }) => <ul className="list-none space-y-1.5 mb-4 pl-4">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mb-4 pl-4 text-muted">{children}</ol>,
        li: ({ children }) => (
          <li className="text-muted flex gap-2 items-start">
            <span className="text-foreground mt-1.5 shrink-0">▸</span>
            <span>{children}</span>
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-foreground pl-4 my-4 text-muted bg-primary-light py-2 pr-2 font-medium">
            {children}
          </blockquote>
        ),
        code: ({ inline, children }) =>
          inline
            ? <code className="bg-primary-light text-foreground px-1.5 py-0.5 font-mono text-[0.85em] border border-dashed border-card-border">{children}</code>
            : <code className="block bg-primary-light text-foreground p-4 font-mono text-sm leading-relaxed overflow-x-auto border-2 border-dashed border-card-border my-4 whitespace-pre">{children}</code>,
        pre: ({ children }) => <>{children}</>,
        hr:  () => <hr className="border-0 border-t-2 border-dashed border-card-border my-8" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-2 border-dashed border-card-border text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-foreground text-background">{children}</thead>,
        th: ({ children }) => <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-widest">{children}</th>,
        td: ({ children }) => <td className="px-4 py-2 border-t border-dashed border-card-border text-muted">{children}</td>,
        img: ({ src, alt }) => (
          <figure className="my-6 sketch-border overflow-hidden">
            <img src={src} alt={alt} className="w-full object-cover" />
            {alt && <figcaption className="text-center text-xs text-muted py-2 border-t border-dashed border-card-border">{alt}</figcaption>}
          </figure>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
