"use client";

import { useState } from "react";
import { PenTool, ArrowLeft, Clock, Calendar } from "lucide-react";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";

const blogs = [
  {
    id: 1,
    title: "Design conferences in 2022",
    category: "Design",
    date: "Feb 23, 2022",
    readTime: "4 min read",
    img: "/old/assets/images/blog-1.jpg",
    excerpt: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
    content: [
      { type: "p", text: "Design conferences have always been a cornerstone of the creative industry — a place where ideas collide, trends emerge, and communities form. In 2022, the landscape shifted dramatically as hybrid events became the new normal, blending in-person energy with digital accessibility." },
      { type: "h2", text: "Why Conferences Still Matter" },
      { type: "p", text: "Despite the rise of online learning platforms and YouTube tutorials, nothing replaces the serendipity of a hallway conversation or a live workshop. Conferences compress months of learning into a few intense days, and the networking alone is worth the ticket price." },
      { type: "h2", text: "Top Events to Watch" },
      { type: "p", text: "From Figma Config to UXDX and Awwwards Conference, 2022 brought a packed calendar. Each event carved out its own niche — some focused on tooling, others on process, and a few on the philosophical underpinnings of what good design actually means." },
      { type: "quote", text: "Design is not just what it looks like and feels like. Design is how it works. — Steve Jobs" },
      { type: "p", text: "The takeaway from this year's circuit? The industry is maturing. Conversations have moved beyond aesthetics into systems thinking, accessibility, and the ethics of design at scale. If you missed any of these events, most have published their talks online — well worth a weekend binge." },
    ],
  },
  {
    id: 2,
    title: "Best fonts every designer should know",
    category: "Design",
    date: "Feb 23, 2022",
    readTime: "5 min read",
    img: "/old/assets/images/blog-2.jpg",
    excerpt: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.",
    content: [
      { type: "p", text: "Typography is the backbone of visual communication. The right typeface can elevate a design from forgettable to iconic, while the wrong one can undermine even the most thoughtful layout. Here's a curated list of fonts every designer should have in their toolkit." },
      { type: "h2", text: "Serif Classics" },
      { type: "p", text: "Garamond, Georgia, and Playfair Display have stood the test of time for good reason. They carry authority and warmth simultaneously — perfect for editorial work, long-form reading, and brand identities that want to feel established." },
      { type: "h2", text: "Modern Sans-Serifs" },
      { type: "p", text: "Inter, Söhne, and Neue Haas Grotesk dominate modern UI design. Inter in particular has become the de facto standard for digital interfaces — its optical sizing and extensive weight range make it incredibly versatile." },
      { type: "quote", text: "Typography is the craft of endowing human language with a durable visual form. — Robert Bringhurst" },
      { type: "h2", text: "Display & Expressive" },
      { type: "p", text: "For headlines and brand moments, Clash Display, Cabinet Grotesk, and Fraunces offer personality without sacrificing legibility. Pair them with a neutral body font and let them do the heavy lifting at large sizes." },
    ],
  },
  {
    id: 3,
    title: "Design digest #80",
    category: "Design",
    date: "Feb 23, 2022",
    readTime: "3 min read",
    img: "/old/assets/images/blog-3.jpg",
    excerpt: "Excepteur sint occaecat cupidatat non proident, quis nostrum exercitationem.",
    content: [
      { type: "p", text: "Welcome to Design Digest #80 — a roundup of the most interesting design work, tools, and conversations from the past two weeks. This edition covers everything from a stunning rebrand to a heated debate about dark patterns." },
      { type: "h2", text: "Rebrand of the Week" },
      { type: "p", text: "The Mailchimp rebrand continues to divide opinion. The new identity leans heavily into a retro-inspired illustration style that feels warm and approachable, but some argue it sacrifices the clarity that made the original mark so recognizable." },
      { type: "h2", text: "Tool Spotlight" },
      { type: "p", text: "Penpot, the open-source design tool, shipped a major update this week. With improved component support and a cleaner developer handoff flow, it's becoming a serious contender for teams that want to avoid vendor lock-in." },
      { type: "quote", text: "Good design is obvious. Great design is transparent. — Joe Sparano" },
      { type: "p", text: "That's a wrap on digest #80. As always, the best design work isn't just beautiful — it solves a real problem for a real person. Keep that north star in mind and you'll rarely go wrong." },
    ],
  },
  {
    id: 4,
    title: "UI interactions of the week",
    category: "Design",
    date: "Feb 23, 2022",
    readTime: "4 min read",
    img: "/old/assets/images/blog-4.jpg",
    excerpt: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    content: [
      { type: "p", text: "Micro-interactions are the unsung heroes of great UX. They're the subtle animations, state changes, and feedback loops that make an interface feel alive and responsive. This week's roundup highlights some of the most creative UI interactions spotted across the web." },
      { type: "h2", text: "The Power of Feedback" },
      { type: "p", text: "A button that subtly scales on press, a form field that shakes on invalid input, a loading state that communicates progress without anxiety — these small moments of feedback build trust between the user and the product." },
      { type: "h2", text: "Motion with Purpose" },
      { type: "p", text: "The best interactions this week shared one thing in common: every animation had a reason to exist. Nothing moved just to move. Transitions guided attention, confirmed actions, and reduced cognitive load." },
      { type: "quote", text: "Animation is not the art of drawings that move, but the art of movements that are drawn. — Norman McLaren" },
      { type: "p", text: "If you're looking to level up your interaction design, start by auditing your existing product. Find the moments where users might feel uncertain or confused, and ask yourself: what small motion or feedback could resolve that?" },
    ],
  },
  {
    id: 5,
    title: "The forgotten art of spacing",
    category: "Design",
    date: "Feb 23, 2022",
    readTime: "6 min read",
    img: "/old/assets/images/blog-5.jpg",
    excerpt: "Ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum.",
    content: [
      { type: "p", text: "Whitespace is not empty space. It's an active design element — one that controls rhythm, directs attention, and communicates hierarchy. Yet it's consistently the first thing sacrificed when stakeholders ask to 'fit more on the page'." },
      { type: "h2", text: "Macro vs Micro Spacing" },
      { type: "p", text: "Macro spacing defines the overall breathing room of a layout — the margins, section gaps, and column gutters. Micro spacing lives at the component level: the padding inside a button, the gap between an icon and its label, the line-height of body text." },
      { type: "h2", text: "Building a Spacing System" },
      { type: "p", text: "The most effective approach is a base-4 or base-8 spacing scale. Every spacing value in your design should be a multiple of 4 (4, 8, 12, 16, 24, 32, 48, 64...). This creates visual consistency without requiring designers to think too hard about individual values." },
      { type: "quote", text: "Whitespace is to be regarded as an active element, not a passive background. — Jan Tschichold" },
      { type: "h2", text: "When to Break the Rules" },
      { type: "p", text: "Optical alignment sometimes requires breaking the mathematical grid. A circle inside a square needs slightly more padding at the top to feel centered. Trust your eyes as much as your system — the goal is always perceived balance, not mathematical perfection." },
    ],
  },
  {
    id: 6,
    title: "Design digest #79",
    category: "Design",
    date: "Feb 23, 2022",
    readTime: "3 min read",
    img: "/old/assets/images/blog-6.jpg",
    excerpt: "Optio cumque nihil impedit quo minus id quod maxime placeat.",
    content: [
      { type: "p", text: "Design Digest #79 is here. This edition is packed with inspiration from the world of branding, a deep dive into color theory, and a look at how AI is starting to change the design workflow." },
      { type: "h2", text: "Color Theory Revisited" },
      { type: "p", text: "A viral thread this week revisited the basics of color theory through the lens of modern UI design. The key insight: most digital color mistakes aren't about hue — they're about saturation and lightness. Desaturating your palette slightly almost always improves readability." },
      { type: "h2", text: "AI in the Design Workflow" },
      { type: "p", text: "Tools like Midjourney and Adobe Firefly are finding their place in the design process — not as replacements for designers, but as rapid ideation partners. The designers getting the most value are using AI for mood boards and concept exploration, then doing the real craft work themselves." },
      { type: "quote", text: "Creativity is intelligence having fun. — Albert Einstein" },
      { type: "p", text: "Until next digest — keep shipping, keep iterating, and remember that the best design is the one that actually gets built." },
    ],
  },
];

function BlogDetail({ blog, onBack }) {
  return (
    <article className={ARTICLE}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors duration-200 mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Blog
      </button>

      <figure className="relative sketch-border overflow-hidden mb-8 aspect-[2/1]">
        <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
          <PenTool size={14} /> {blog.category}
        </div>
      </figure>

      <header className="mb-8">
        <div className="flex items-center gap-4 text-xs text-muted font-bold tracking-widest uppercase mb-4">
          <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
          <span className="text-card-border">·</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-signature font-bold text-foreground leading-snug">
          {blog.title}
        </h2>
      </header>

      <div className="prose-custom space-y-6 text-muted text-base lg:text-lg leading-relaxed font-light">
        {blog.content.map((block, i) => {
          if (block.type === "h2") return (
            <h3 key={i} className="text-2xl lg:text-3xl font-signature font-bold text-foreground mt-10 mb-2">
              {block.text}
            </h3>
          );
          if (block.type === "quote") return (
            <blockquote key={i} className="border-l-4 border-foreground pl-6 py-2 my-8 sketch-border bg-primary-light">
              <p className="text-foreground font-signature text-xl italic">{block.text}</p>
            </blockquote>
          );
          return <p key={i}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}

export function Blog() {
  const [selected, setSelected] = useState(null);

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

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog, idx) => (
          <li key={idx} className="group">
            <button
              onClick={() => setSelected(idx)}
              className="block w-full text-left bg-card sketch-border overflow-hidden hover:translate-x-1 hover:translate-y-1 transition-all duration-300 hover:bg-primary-light"
            >
              <figure className="relative overflow-hidden aspect-[1.8/1] border-b-2 border-dashed border-card-border">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
                  <PenTool size={14} /> {blog.category}
                </div>
              </figure>
              <div className="p-5 lg:p-6">
                <div className="flex items-center gap-3 text-xs text-muted font-bold tracking-widest uppercase mb-2">
                  <span>{blog.date}</span>
                  <span className="text-card-border">·</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-2xl font-signature font-bold text-foreground mb-2 leading-snug">{blog.title}</h3>
                <p className="text-muted leading-relaxed line-clamp-2 text-sm lg:text-base">{blog.excerpt}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
