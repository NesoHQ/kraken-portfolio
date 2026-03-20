"use client";

import { useEffect, useState } from "react";
import { PenTool, ArrowLeft, Clock, Calendar, Loader2 } from "lucide-react";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";

const STATIC_BLOGS = [
  {
    _id: "static-1",
    title: "Design conferences in 2022",
    category: "Design",
    createdAt: "2022-02-23",
    readTime: "4 min read",
    image: "/old/assets/images/blog-1.jpg",
    excerpt: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
    content: `Design conferences have always been a cornerstone of the creative industry — a place where ideas collide, trends emerge, and communities form. In 2022, the landscape shifted dramatically as hybrid events became the new normal.\n\nDespite the rise of online learning platforms, nothing replaces the serendipity of a hallway conversation or a live workshop. Conferences compress months of learning into a few intense days.\n\nFrom Figma Config to UXDX and Awwwards Conference, 2022 brought a packed calendar. Each event carved out its own niche — some focused on tooling, others on process.`,
  },
  {
    _id: "static-2",
    title: "Best fonts every designer should know",
    category: "Design",
    createdAt: "2022-02-23",
    readTime: "5 min read",
    image: "/old/assets/images/blog-2.jpg",
    excerpt: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.",
    content: `Typography is the backbone of visual communication. The right typeface can elevate a design from forgettable to iconic, while the wrong one can undermine even the most thoughtful layout.\n\nGaramond, Georgia, and Playfair Display have stood the test of time. They carry authority and warmth simultaneously — perfect for editorial work and brand identities.\n\nInter, Söhne, and Neue Haas Grotesk dominate modern UI design. Inter has become the de facto standard for digital interfaces.`,
  },
  {
    _id: "static-3",
    title: "Design digest #80",
    category: "Design",
    createdAt: "2022-02-23",
    readTime: "3 min read",
    image: "/old/assets/images/blog-3.jpg",
    excerpt: "Excepteur sint occaecat cupidatat non proident, quis nostrum exercitationem.",
    content: `Welcome to Design Digest #80 — a roundup of the most interesting design work, tools, and conversations from the past two weeks.\n\nThe Mailchimp rebrand continues to divide opinion. The new identity leans heavily into a retro-inspired illustration style that feels warm and approachable.\n\nPenpot, the open-source design tool, shipped a major update this week with improved component support and a cleaner developer handoff flow.`,
  },
  {
    _id: "static-4",
    title: "UI interactions of the week",
    category: "Design",
    createdAt: "2022-02-23",
    readTime: "4 min read",
    image: "/old/assets/images/blog-4.jpg",
    excerpt: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    content: `Micro-interactions are the unsung heroes of great UX. They're the subtle animations, state changes, and feedback loops that make an interface feel alive and responsive.\n\nA button that subtly scales on press, a form field that shakes on invalid input, a loading state that communicates progress — these small moments of feedback build trust.\n\nThe best interactions this week shared one thing in common: every animation had a reason to exist. Nothing moved just to move.`,
  },
  {
    _id: "static-5",
    title: "The forgotten art of spacing",
    category: "Design",
    createdAt: "2022-02-23",
    readTime: "6 min read",
    image: "/old/assets/images/blog-5.jpg",
    excerpt: "Ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum.",
    content: `Whitespace is not empty space. It's an active design element — one that controls rhythm, directs attention, and communicates hierarchy.\n\nMacro spacing defines the overall breathing room of a layout — the margins, section gaps, and column gutters. Micro spacing lives at the component level.\n\nThe most effective approach is a base-4 or base-8 spacing scale. Every spacing value in your design should be a multiple of 4.`,
  },
  {
    _id: "static-6",
    title: "Design digest #79",
    category: "Design",
    createdAt: "2022-02-23",
    readTime: "3 min read",
    image: "/old/assets/images/blog-6.jpg",
    excerpt: "Optio cumque nihil impedit quo minus id quod maxime placeat.",
    content: `Design Digest #79 is here. This edition is packed with inspiration from the world of branding, a deep dive into color theory, and a look at how AI is changing the design workflow.\n\nA viral thread this week revisited color theory through the lens of modern UI design. Most digital color mistakes aren't about hue — they're about saturation and lightness.\n\nTools like Midjourney and Adobe Firefly are finding their place in the design process as rapid ideation partners.`,
  },
];

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
      .then(j => { if (j.data) setFull(j.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [blog._id]);

  return (
    <article className={ARTICLE}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors duration-200 mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Blog
      </button>

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
        <div className="space-y-5 text-muted text-base lg:text-lg leading-relaxed font-light">
          {(full.content || '').split('\n\n').filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </article>
  );
}

export function Blog() {
  const [blogs, setBlogs] = useState(STATIC_BLOGS);
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
          {blogs.map((blog, idx) => (
            <li key={blog._id || idx} className="group">
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
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
