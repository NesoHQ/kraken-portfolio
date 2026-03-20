"use client";

import { useEffect, useState } from 'react';

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";

const STATIC_PROJECTS = [
  { title: "Finance",      category: "Web development", img: "/old/assets/images/project-1.jpg" },
  { title: "Orizon",       category: "Web development", img: "/old/assets/images/project-2.png" },
  { title: "Fundo",        category: "Web design",      img: "/old/assets/images/project-3.jpg" },
  { title: "Brawlhalla",   category: "Applications",    img: "/old/assets/images/project-4.png" },
  { title: "DSM.",         category: "Web design",      img: "/old/assets/images/project-5.png" },
  { title: "MetaSpark",    category: "Web design",      img: "/old/assets/images/project-6.png" },
  { title: "Summary",      category: "Web development", img: "/old/assets/images/project-7.png" },
  { title: "Task Manager", category: "Applications",    img: "/old/assets/images/project-8.jpg" },
  { title: "Arrival",      category: "Web development", img: "/old/assets/images/project-9.png" },
];

export function Portfolio({ filter, setFilter }) {
  const [projects, setProjects] = useState(STATIC_PROJECTS);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(j => {
        const items = j.data;
        if (Array.isArray(items) && items.length) setProjects(items);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          Portfolio
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      <ul className="flex gap-6 md:gap-10 mb-10 overflow-x-auto pb-4 scrollbar-hide border-b-2 border-foreground border-dashed">
        {categories.map(f => (
          <li key={f} className="shrink-0">
            <button
              onClick={() => setFilter(f)}
              className={`text-lg lg:text-xl font-signature font-bold pb-2 border-b-[3px] transition-all duration-300 whitespace-nowrap ${filter === f ? 'text-foreground border-foreground scale-105' : 'text-muted border-transparent hover:text-foreground hover:border-border'}`}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, idx) => (
          <li key={project._id || idx} className="group">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectCard({ project }) {
  const Tag = project.link ? 'a' : 'div';
  const linkProps = project.link
    ? { href: project.link, target: '_blank', rel: 'noreferrer noopener' }
    : {};

  return (
    <Tag {...linkProps} className={`block group ${project.link ? 'cursor-pointer' : 'cursor-default'}`}>
      <figure className="relative sketch-border overflow-hidden mb-4 aspect-4/3 bg-card p-1 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 group-hover:bg-primary-light">
        {/* Hover overlay — only shown when there's a link */}
        {project.link && (
          <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="p-3 bg-foreground text-background sketch-border translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              {/* External link icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
          </div>
        )}
        {project.img
          ? <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
          : <div className="w-full h-full bg-primary-light flex items-center justify-center text-muted text-xs font-bold uppercase tracking-widest">{project.category}</div>
        }
      </figure>
      <div className="flex items-start justify-between gap-2 ml-1">
        <div>
          <h3 className="text-xl font-signature font-bold text-foreground mb-1">{project.title}</h3>
          <p className="text-xs lg:text-sm text-muted font-bold uppercase tracking-wider">{project.category}</p>
          {project.desc && <p className="text-xs text-muted mt-1 line-clamp-2">{project.desc}</p>}
        </div>
        {project.link && (
          <span className="shrink-0 mt-1 text-muted group-hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </span>
        )}
      </div>
    </Tag>
  );
}
