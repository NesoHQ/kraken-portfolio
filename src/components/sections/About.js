"use client";

import { useEffect, useState } from "react";
import { Server, Globe, GitBranch, Database } from "lucide-react";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";
const SECTION_TITLE = "text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3";

const ICON_MAP = {
  Server:   <Server size={32} />,
  Globe:    <Globe size={32} />,
  GitBranch:<GitBranch size={32} />,
  Database: <Database size={32} />,
};

export function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(j => {
        setData(j.data ?? null)
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);


  if(loading) return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-1/3 bg-card" />
      <div className="h-4 w-full bg-card" />
      <div className="h-4 w-5/6 bg-card" />
    </div>
  );

  if(!data) return null;

  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          About me
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      {/* Bio */}
      <section className="text-muted text-base lg:text-lg leading-relaxed space-y-6 font-light mb-12">
        {(data?.bio?.length ? data.bio : []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {/* Services */}
      {data.services?.length > 0 && (
        <section className="mb-12">
          <h3 className={SECTION_TITLE}><span className="text-2xl">✦</span> What I&apos;m doing</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.services.map((s, idx) => (
              <li key={idx} className="bg-card p-6 sketch-border flex flex-col gap-4 hover:translate-x-1 hover:translate-y-1 transition-all duration-300 group hover:bg-primary-light">
                <div className="w-12 h-12 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-500">
                  {ICON_MAP[s.icon] ?? <Server size={32} />}
                </div>
                <div>
                  <h4 className="font-signature font-bold text-2xl text-foreground mb-2">{s.title}</h4>
                  <p className="text-sm lg:text-base text-muted leading-relaxed font-light">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Open Source */}
      {(data.openSource?.title || data.openSource?.points?.length > 0) && (
        <section className="mb-12">
          <h3 className={SECTION_TITLE}><span className="text-2xl">✦</span> Open Source</h3>
          <div className="bg-card sketch-border p-6 hover:bg-primary-light transition-all duration-300">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
              {data.githubOrg ? (
                <a href={data.githubOrg} target="_blank" rel="noopener noreferrer" className="font-signature font-bold text-2xl text-foreground hover:underline underline-offset-4">
                  {data.openSource.title}
                </a>
              ) : (
                <span className="font-signature font-bold text-2xl text-foreground">{data.openSource.title}</span>
              )}
              {data.openSource.period && (
                <span className="text-xs font-bold text-muted tracking-widest uppercase sketch-border px-3 py-1 bg-background">{data.openSource.period}</span>
              )}
            </div>
            {data.openSource.points?.length > 0 && (
              <ul className="space-y-2 text-sm lg:text-base text-muted font-light leading-relaxed">
                {data.openSource.points.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-foreground mt-1 shrink-0">—</span>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {data.techStack?.length > 0 && (
        <section>
          <h3 className={SECTION_TITLE}><span className="text-2xl">✦</span> Tech Stack</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.techStack.map((item, i) => (
              <li key={i} className="flex gap-3 items-start sketch-border bg-card px-4 py-3 hover:bg-primary-light transition-all duration-200">
                <span className="text-xs font-bold uppercase tracking-widest text-muted shrink-0 w-24 pt-[2px]">{item.label}</span>
                <span className="text-sm text-foreground font-medium leading-snug">{item.value}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
