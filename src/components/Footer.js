"use client";

import { useState, useEffect } from 'react';
import { version } from '../../package.json';

export function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(j => setData(j.data ?? null))
      .catch(() => {});
  }, []);

  return (
    <footer className="w-full max-w-[1200px] mx-auto px-4 pb-24 lg:pb-10">
      <div className="border-t-2 border-dashed border-card-border pt-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-3">

        {/* Left — copyright */}
        <p className="text-xs text-muted font-bold tracking-widest uppercase text-center sm:text-left">
          © {new Date().getFullYear()}{data?.name ? ` ${data.name}.` : ''}
        </p>

        {/* Center — version badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 border-2 border-dashed border-card-border px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-muted">
            <span className="w-1.5 h-1.5 bg-foreground inline-block" />
            <span className="font-signature text-sm text-foreground">v{version}</span>
            <span className="text-card-border">·</span>
            <span>open source</span>
          </span>
        </div>

        {/* Right — links */}
        <div className="flex items-center justify-center sm:justify-end gap-4 text-xs text-muted font-bold tracking-widest uppercase">
          {data?.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200">GitHub</a>
          )}
          {data?.github && data?.linkedin && <span className="text-card-border">·</span>}
          {data?.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200">LinkedIn</a>
          )}
        </div>

      </div>
    </footer>
  );
}
