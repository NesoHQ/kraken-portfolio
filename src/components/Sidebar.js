"use client";

import { useState, useEffect } from "react";
import { Mail, Smartphone, MapPin } from "lucide-react";

const STATIC = {
  name:      "Iqbal Hossain",
  title:     "Senior Software Engineer",
  avatar:    "/astha.jpeg",
  email:     "zafar.iq3089@gmail.com",
  phone:     "+880 1403229479",
  location:  "Dhaka-1230, Bangladesh",
  linkedin:  "https://linkedin.com/in/geomachine",
  github:    "https://github.com/geomachine",
};

const GH_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LI_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(STATIC);

  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(j => {
        if (j.data) {
          setData({
            name:     j.data.name     || STATIC.name,
            title:    j.data.title    || STATIC.title,
            avatar:   j.data.avatar   || STATIC.avatar,
            email:    j.data.email    || STATIC.email,
            phone:    j.data.phone    || STATIC.phone,
            location: j.data.location || STATIC.location,
            linkedin: j.data.linkedin || STATIC.linkedin,
            github:   j.data.github   || STATIC.github,
          });
        }
      })
      .catch(() => {});
  }, []);

  const contacts = [
    { title: "Email",    value: data.email,    link: `mailto:${data.email}`,  icon: <Mail size={15} /> },
    { title: "Phone",    value: data.phone,    link: `tel:${data.phone}`,     icon: <Smartphone size={15} /> },
    { title: "Location", value: data.location, link: null,                    icon: <MapPin size={15} /> },
  ].filter(c => c.value);

  const socials = [
    { id: "linkedin", icon: LI_SVG, href: data.linkedin },
    { id: "github",   icon: GH_SVG, href: data.github   },
  ].filter(s => s.href);

  return (
    <aside className={`bg-sidebar border-2 border-card-border sketch-border paper-pattern p-4 lg:p-6 transition-[max-height] duration-500 ease-in-out relative z-10 lg:sticky lg:top-[60px] lg:mb-0 lg:w-[280px] lg:shrink-0 lg:flex lg:flex-col lg:justify-center lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar overflow-hidden ${isActive ? 'max-h-[800px]' : 'max-h-[110px]'}`}>

      {/* Top info */}
      <div className="sidebar-info flex items-center gap-[20px] relative lg:block lg:text-center">
        <div className="relative w-[70px] h-[70px] lg:w-[130px] lg:h-[130px] lg:mx-auto">
          <figure className="relative bg-card sketch-border w-full h-full overflow-hidden flex items-center justify-center p-1 z-10 group cursor-pointer transition-all duration-300 group-hover:bg-primary-light">
            <img
              src={data.avatar || STATIC.avatar}
              alt={data.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </figure>
        </div>

        <div className="info-content lg:mt-5 text-left lg:text-center">
          <h1 className="name text-xl lg:text-3xl font-signature font-bold tracking-tight text-foreground mb-1" title={data.name}>
            {data.name}
          </h1>
          <p className="title bg-foreground text-background text-[11px] lg:text-[12px] font-bold px-3 py-1 sketch-border w-fit lg:mx-auto tracking-wide uppercase">
            {data.title}
          </p>
        </div>

        <button
          className="info_more-btn absolute -top-4 -right-4 lg:hidden sketch-border py-2 px-4 text-[12px] font-bold bg-foreground text-background hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 active:scale-95"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{isActive ? 'Hide' : 'Show'} Contacts</span>
        </button>
      </div>

      {/* Expandable section */}
      <div className={`sidebar-info_more ${isActive ? 'block' : 'hidden'} lg:block transition-all duration-500`}>
        <div className="h-px bg-border my-6" />

        {/* Download Resume */}
        <a
          href="/resume.pdf"
          download
          className="flex items-center justify-center gap-2 w-full bg-foreground text-background py-3 px-4 sketch-border font-signature font-bold text-lg transition-all duration-300 hover:bg-primary-hover hover:scale-105 active:scale-95 mb-6 group focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-y-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Resume
        </a>

        {/* Contacts */}
        <ul className="contacts-list space-y-[20px]">
          {contacts.map((contact, idx) => (
            <li key={idx} className="contact-item flex items-center gap-3 group cursor-pointer">
              <div className="w-[34px] h-[34px] shrink-0 text-foreground bg-card sketch-border flex justify-center items-center group-hover:bg-primary-light transition-all duration-300">
                {contact.icon}
              </div>
              <div className="contact-info text-left overflow-hidden min-w-0">
                <p className="contact-title text-[10px] text-muted uppercase tracking-widest mb-0.5">{contact.title}</p>
                {contact.link ? (
                  <a href={contact.link} className="contact-link text-[11px] text-foreground hover:text-primary transition-colors font-medium block truncate">{contact.value}</a>
                ) : (
                  <span className="text-[11px] text-foreground font-medium block truncate">{contact.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="h-[2px] bg-border my-6 border-b-2 border-dashed" />

        {/* Socials */}
        <ul className="social-list flex justify-center items-center gap-4">
          {socials.map((ic) => (
            <li key={ic.id} className="social-item">
              <a
                href={ic.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-background hover:bg-foreground transition-all duration-300 text-lg p-2 sketch-border active:scale-95 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-sidebar flex items-center justify-center"
              >
                {ic.icon}
              </a>
            </li>
          ))}
        </ul>

        {/* Use this template — split button */}
        <div className="mt-5 flex sketch-border overflow-hidden">
          {/* Left — use template */}
          <a
            href="https://github.com/geomachine/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center gap-2.5 bg-foreground text-background px-3 py-3 hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="currentColor" viewBox="0 0 24 24" className="shrink-0">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="flex flex-col">
              <span className="text-[9px] font-bold tracking-widest uppercase opacity-60 leading-none mb-0.5">open source</span>
              <span className="font-signature font-bold text-sm leading-tight group-hover:underline underline-offset-2">Use this template</span>
            </span>
          </a>

          {/* Divider */}
          <span className="w-px bg-background/20" />

          {/* Right — star */}
          <a
            href="https://github.com/geomachine/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            title="Star this repo on GitHub"
            className="flex flex-col items-center justify-center gap-1 bg-foreground text-background px-3.5 py-2 hover:bg-background/10 hover:text-foreground active:scale-95 transition-all duration-200 focus:outline-none group/star"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" viewBox="0 0 24 24" className="group-hover/star:scale-125 group-hover/star:fill-yellow-400 transition-all duration-300">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
            </svg>
            <span className="text-[9px] font-bold tracking-widest uppercase opacity-70 leading-none">Star</span>
          </a>
        </div>

      </div>
    </aside>
  );
}
