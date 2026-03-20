import { ArrowLeft, PenTool, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { MarkdownContent } from '@/components/admin/MarkdownEditor';
import connectDB from '@/lib/db/mongoose';
import Blog from '@/lib/db/models/Blog';

// Static fallback data (same as Blog.js)
const STATIC_BLOGS = [
  {
    _id: 'static-1',
    title: 'Design conferences in 2022',
    category: 'Design',
    createdAt: '2022-02-23',
    image: '/old/assets/images/blog-1.jpg',
    excerpt: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    content: `Design conferences have always been a cornerstone of the creative industry — a place where ideas collide, trends emerge, and communities form. In 2022, the landscape shifted dramatically as hybrid events became the new normal.\n\nDespite the rise of online learning platforms, nothing replaces the serendipity of a hallway conversation or a live workshop. Conferences compress months of learning into a few intense days.\n\nFrom Figma Config to UXDX and Awwwards Conference, 2022 brought a packed calendar. Each event carved out its own niche — some focused on tooling, others on process.`,
  },
  {
    _id: 'static-2',
    title: 'Best fonts every designer should know',
    category: 'Design',
    createdAt: '2022-02-23',
    image: '/old/assets/images/blog-2.jpg',
    excerpt: 'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.',
    content: `Typography is the backbone of visual communication. The right typeface can elevate a design from forgettable to iconic, while the wrong one can undermine even the most thoughtful layout.\n\nGaramond, Georgia, and Playfair Display have stood the test of time. They carry authority and warmth simultaneously — perfect for editorial work and brand identities.\n\nInter, Söhne, and Neue Haas Grotesk dominate modern UI design. Inter has become the de facto standard for digital interfaces.`,
  },
  {
    _id: 'static-3',
    title: 'Design digest #80',
    category: 'Design',
    createdAt: '2022-02-23',
    image: '/old/assets/images/blog-3.jpg',
    excerpt: 'Excepteur sint occaecat cupidatat non proident, quis nostrum exercitationem.',
    content: `Welcome to Design Digest #80 — a roundup of the most interesting design work, tools, and conversations from the past two weeks.\n\nThe Mailchimp rebrand continues to divide opinion. The new identity leans heavily into a retro-inspired illustration style that feels warm and approachable.\n\nPenpot, the open-source design tool, shipped a major update this week with improved component support and a cleaner developer handoff flow.`,
  },
  {
    _id: 'static-4',
    title: 'UI interactions of the week',
    category: 'Design',
    createdAt: '2022-02-23',
    image: '/old/assets/images/blog-4.jpg',
    excerpt: 'Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    content: `Micro-interactions are the unsung heroes of great UX. They're the subtle animations, state changes, and feedback loops that make an interface feel alive and responsive.\n\nA button that subtly scales on press, a form field that shakes on invalid input, a loading state that communicates progress — these small moments of feedback build trust.\n\nThe best interactions this week shared one thing in common: every animation had a reason to exist. Nothing moved just to move.`,
  },
  {
    _id: 'static-5',
    title: 'The forgotten art of spacing',
    category: 'Design',
    createdAt: '2022-02-23',
    image: '/old/assets/images/blog-5.jpg',
    excerpt: 'Ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum.',
    content: `Whitespace is not empty space. It's an active design element — one that controls rhythm, directs attention, and communicates hierarchy.\n\nMacro spacing defines the overall breathing room of a layout — the margins, section gaps, and column gutters. Micro spacing lives at the component level.\n\nThe most effective approach is a base-4 or base-8 spacing scale. Every spacing value in your design should be a multiple of 4.`,
  },
  {
    _id: 'static-6',
    title: 'Design digest #79',
    category: 'Design',
    createdAt: '2022-02-23',
    image: '/old/assets/images/blog-6.jpg',
    excerpt: 'Optio cumque nihil impedit quo minus id quod maxime placeat.',
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

async function getBlog(id) {
  // Static fallback
  if (id.startsWith('static-')) {
    return STATIC_BLOGS.find(b => b._id === id) ?? null;
  }
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    if (!blog) return null;
    return { ...blog, _id: blog._id.toString() };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: 'Post not found' };
  return {
    title: blog.title,
    description: blog.excerpt || '',
    openGraph: { title: blog.title, description: blog.excerpt || '', images: blog.image ? [blog.image] : [] },
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background paper-pattern flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-4xl font-signature font-bold text-foreground">Post not found</p>
          <Link href="/" className="text-sm text-muted hover:text-foreground underline underline-offset-4">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background paper-pattern">
      <div className="max-w-3xl mx-auto px-4 py-12 lg:py-16">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors mb-10 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to portfolio
        </Link>

        <article className="bg-card sketch-border paper-pattern p-6 lg:p-10">
          {/* Cover image */}
          {blog.image && (
            <figure className="relative sketch-border overflow-hidden mb-8 aspect-[2/1] -mx-6 lg:-mx-10 -mt-6 lg:-mt-10">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
                <PenTool size={14} /> {blog.category}
              </div>
            </figure>
          )}

          {/* Meta */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-xs text-muted font-bold tracking-widest uppercase mb-4">
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(blog.createdAt)}</span>
              <span className="text-card-border">·</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {estimateReadTime(blog.content)}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-signature font-bold text-foreground leading-snug">{blog.title}</h1>
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 border border-dashed border-card-border text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <MarkdownContent content={blog.content || ''} />
        </article>
      </div>
    </div>
  );
}
