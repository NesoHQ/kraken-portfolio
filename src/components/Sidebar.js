"use client";

import { useState } from "react";
import { Mail, Smartphone, Calendar, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Sidebar() {
    const [isActive, setIsActive] = useState(false);

    return (
        <aside className={`bg-sidebar border-2 border-card-border sketch-border paper-pattern p-4 lg:p-6 transition-[max-height] duration-500 ease-in-out relative z-10 lg:sticky lg:top-[60px] lg:mb-0 lg:w-[280px] lg:shrink-0 lg:flex lg:flex-col lg:justify-center lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar overflow-hidden ${isActive ? 'max-h-[800px]' : 'max-h-[110px]'}`}>
            <div className="sidebar-info flex items-center gap-[20px] relative lg:block lg:text-center">
                <div className="relative w-[70px] h-[70px] lg:w-[130px] lg:h-[130px] lg:mx-auto">
                    <figure className="relative bg-card sketch-border w-full h-full overflow-hidden flex items-center justify-center p-1 z-10 group cursor-pointer transition-all duration-300 group-hover:bg-primary-light">
                        <img src="/old/assets/images/my-avatar.png" alt="Iqbal Hossain" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                    </figure>
                </div>

                <div className="info-content lg:mt-5 text-left lg:text-center">
                    <h1 className="name text-xl lg:text-3xl font-signature font-bold tracking-tight text-foreground mb-1" title="Iqbal Hossain">Iqbal Hossain</h1>
                    <p className="title bg-foreground text-background text-[11px] lg:text-[12px] font-bold px-3 py-1 sketch-border w-fit lg:mx-auto tracking-wide uppercase">Senior Software Engineer</p>
                </div>

                <button
                    className="info_more-btn absolute -top-4 -right-4 lg:hidden sketch-border py-2 px-4 text-[12px] font-bold bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsActive(!isActive)}
                >
                    <span>{isActive ? 'Hide' : 'Show'} Contacts</span>
                </button>
            </div>

            <div className={`sidebar-info_more ${isActive ? 'block' : 'hidden'} lg:block transition-all duration-500`}>
                <div className="h-px bg-border my-6"></div>

                {/* Download Resume CTA */}
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

                <ul className="contacts-list space-y-[30px]">
                    {[
                        { title: "Email", value: "[EMAIL_ADDRESS]", link: "mailto:[EMAIL_ADDRESS]", icon: <Mail size={18} /> },
                        { title: "Phone", value: "+1 (213) 352-2795", link: "tel:+12133522795", icon: <Smartphone size={18} /> },
                        { title: "Birthday", value: "June 23, 1982", icon: <Calendar size={18} /> },
                        { title: "Location", value: "Sacramento, California, USA", icon: <MapPin size={18} /> }
                    ].map((contact, idx) => (
                        <li key={idx} className="contact-item flex items-center gap-3 group cursor-pointer">
                            <div className="w-[40px] h-[40px] shrink-0 text-foreground text-lg bg-card sketch-border flex justify-center items-center group-hover:bg-primary-light group-hover:text-foreground transition-all duration-300">
                                {contact.icon}
                            </div>
                            <div className="contact-info text-left overflow-hidden">
                                <p className="contact-title text-[11px] text-muted uppercase tracking-widest mb-1">{contact.title}</p>
                                {contact.link ? (
                                    <a href={contact.link} className="contact-link text-[14px] text-foreground group-hover:text-primary transition-colors break-words font-medium">{contact.value}</a>
                                ) : (
                                    <time className="text-[14px] text-foreground font-medium">{contact.value}</time>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="h-[2px] bg-border my-6 object-cover border-b-2 border-dashed"></div>

                <ul className="social-list flex justify-center items-center gap-4">
                    {[{ id: "fb", icon: <Facebook size={18} /> }, { id: "tw", icon: <Twitter size={18} /> }, { id: "ins", icon: <Instagram size={18} /> }].map((ic, i) => (
                        <li key={i} className="social-item">
                            <button className="text-muted hover:text-background hover:bg-foreground transition-all duration-300 text-lg p-2 sketch-border active:scale-95 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-sidebar">
                                {ic.icon}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    );
}
