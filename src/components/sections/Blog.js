"use client";

import { useEffect, useState } from "react";
import { PenTool, ArrowLeft, Clock, Calendar, Loader2, ExternalLink } from "lucide-react";
import { MarkdownContent } from "@/components/admin/MarkdownEditor";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";


function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return dateStr; }
}

function estimateReadTime(content) {
  if (!content) return '1 min read';
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function BlogDetail({ blog, onBack }) {
  const [full, setFull] = useState(blog);
  const [loading, setLoading] = useState(!blog.content);

  useEffect(() => {
    // If it's a static blog or content is already loaded, skip
    if (blog._id?.startsWith('static-') || blog.content) { setLoading(false); return; }
    fetch(`/api/blogs/${blog._id}`)
      .then(r => r.json())
      .then(j => { if (j.data) setFull(prev => ({ ...prev, ...j.data })); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [blog._id]);

  return (
    <article className={ARTICLE}>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors duration-200 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </button>
        <a
          href={`/blog/${full._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 sketch-border text-[11px] font-bold tracking-widest uppercase hover:bg-primary-hover active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          <ExternalLink size={11} />
          Open in new tab
        </a>
      </div>

      {full.image && (
        <figure className="relative sketch-border overflow-hidden mb-8 aspect-[2/1]">
          <img src={full.image} alt={full.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
            <PenTool size={14} /> {full.category}
          </div>
        </figure>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-4 text-xs text-muted font-bold tracking-widest uppercase mb-4">
          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(full.createdAt)}</span>
          <span className="text-card-border">·</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {estimateReadTime(full.content)}</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-signature font-bold text-foreground leading-snug">{full.title}</h2>
      </header>

      {loading ? (
        <div className="py-12 text-center text-muted"><Loader2 size={20} className="animate-spin mx-auto" /></div>
      ) : (
        <div className="text-base lg:text-lg">
          <MarkdownContent content={full.content || ''} />
        </div>
      )}
    </article>
  );
}

export function Blog() {
  const [blogs, setBlogs] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs?limit=20')
      .then(r => r.json())
      .then(j => {
        const items = j.data?.items ?? j.data;
        if (Array.isArray(items) && items.length) setBlogs(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (selected !== null) {
    return <BlogDetail blog={blogs[selected]} onBack={() => setSelected(null)} />;
  }

  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          Blog
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      {loading ? (
        <div className="py-16 text-center text-muted"><Loader2 size={24} className="animate-spin mx-auto" /></div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs?.map((blog, idx) => (
            <li key={blog._id || idx} className="group relative">
              <button
                onClick={() => setSelected(idx)}
                className="block w-full text-left bg-card sketch-border overflow-hidden hover:translate-x-1 hover:translate-y-1 transition-all duration-300 hover:bg-primary-light"
              >
                {blog.image && (
                  <figure className="relative overflow-hidden aspect-[1.8/1] border-b-2 border-dashed border-card-border">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
                      <PenTool size={14} /> {blog.category}
                    </div>
                  </figure>
                )}
                <div className="p-5 lg:p-6">
                  <div className="flex items-center gap-3 text-xs text-muted font-bold tracking-widest uppercase mb-2">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span className="text-card-border">·</span>
                    <span>{estimateReadTime(blog.content || blog.excerpt)}</span>
                  </div>
                  <h3 className="text-2xl font-signature font-bold text-foreground mb-2 leading-snug">{blog.title}</h3>
                  <p className="text-muted leading-relaxed line-clamp-2 text-sm lg:text-base">{blog.excerpt}</p>
                </div>
              </button>

              {/* Open in new tab — slides down from top-right on hover */}
              <a
                href={`/blog/${blog._id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 sketch-border text-[11px] font-bold tracking-widest uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-primary-hover active:scale-95 whitespace-nowrap"
              >
                <ExternalLink size={11} />
                Open in new tab
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
