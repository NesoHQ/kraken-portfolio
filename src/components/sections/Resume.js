"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";
const SECTION_TITLE = "text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3";

export function Resume() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/resume')
      .then(r => r.json())
      .then(j => {
        if (j.data) {
          setData({
            infraProjects: j.data.infraProjects ?? null,
            experience:    j.data.experience    ?? null,
            skills:        j.data.skills        ?? null,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          Resume
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      {/* Projects */}
      { data?.infraProjects?.length > 0 && <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-card sketch-border flex items-center justify-center text-foreground"><GraduationCap size={24} /></div>
          <h3 className="text-3xl lg:text-4xl font-signature font-bold text-foreground">Projects</h3>
        </div>
        <ol className="ml-6 border-l-2 border-foreground border-dashed pl-8 space-y-10">
          {data?.infraProjects?.map((item, idx) => (
            <li key={idx} className="relative group">
              <div className="absolute -left-[41px] top-[6px] w-[18px] h-[18px] bg-background border-[3px] border-foreground group-hover:bg-foreground transition-all duration-300" />
              <h4 className="font-signature font-bold text-2xl text-foreground mb-1">{item.title}</h4>
              <span className="text-muted text-xs lg:text-sm font-bold tracking-widest block mb-2 uppercase">{item.period}</span>
              <p className="text-muted font-light leading-relaxed text-sm lg:text-base">{item.text}</p>
            </li>
          ))}
        </ol>
      </section> }

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-card sketch-border flex items-center justify-center text-foreground"><Briefcase size={24} /></div>
          <h3 className="text-3xl lg:text-4xl font-signature font-bold text-foreground">Experience</h3>
        </div>
        <ol className="ml-6 border-l-2 border-foreground border-dashed pl-8 space-y-10">
          {data?.experience?.map((item, idx) => (
            <li key={idx} className="relative group">
              <div className="absolute -left-[41px] top-[6px] w-[18px] h-[18px] bg-background border-[3px] border-foreground group-hover:bg-foreground transition-all duration-300" />
              <h4 className="font-signature font-bold text-2xl text-foreground mb-0.5">{item.title}</h4>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-foreground text-sm font-bold">{item.company}</span>
                <span className="text-muted text-xs">·</span>
                <span className="text-muted text-xs lg:text-sm font-bold tracking-widest uppercase">{item.period}</span>
              </div>
              <ul className="space-y-1">
                {item.points.filter(Boolean).map((p, i) => (
                  <li key={i} className="text-muted font-light leading-relaxed text-sm lg:text-base flex gap-2">
                    <span className="text-foreground shrink-0 mt-1">—</span>{p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section>
        <h3 className={SECTION_TITLE}><span className="text-2xl">✦</span> My skills</h3>
        <div className="space-y-4">
          {data?.skills?.map((group, idx) => (
            <div key={idx} className="sketch-border bg-card p-4 hover:bg-primary-light transition-colors duration-200">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-bold px-3 py-1 border-2 border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
