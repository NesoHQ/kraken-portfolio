"use client";

import { useState } from "react";
import { Mail, Smartphone, Calendar, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Sidebar() {
    const [isActive, setIsActive] = useState(false);

    return (
        <aside className={`bg-sidebar border-2 border-card-border sketch-border paper-pattern p-4 lg:p-6 transition-[max-height] duration-500 ease-in-out relative z-10 lg:sticky lg:top-[60px] lg:mb-0 lg:w-[280px] lg:shrink-0 lg:!max-h-none lg:overflow-visible overflow-hidden ${isActive ? 'max-h-[800px]' : 'max-h-[110px]'}`}>
            <div className="sidebar-info flex items-center gap-[20px] relative lg:block lg:text-center">
                <div className="relative w-[70px] h-[70px] lg:w-[130px] lg:h-[130px] lg:mx-auto">
                    <figure className="relative bg-card sketch-border w-full h-full overflow-hidden flex items-center justify-center p-1 z-10 group cursor-pointer grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:border-accent">
                        <img src="/old/assets/images/my-avatar.png" alt="Iqbal Hossain" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                    </figure>
                </div>

                <div className="info-content lg:mt-5 text-left lg:text-center">
                    <h1 className="name text-xl lg:text-3xl font-signature font-bold tracking-tight text-foreground mb-1" title="Iqbal Hossain">Iqbal Hossain</h1>
                    <p className="title bg-accent text-[11px] lg:text-[12px] text-white font-bold px-3 py-1 sketch-border w-fit lg:mx-auto tracking-wide uppercase">Senior Software Engineer</p>
                </div>

                <button
                    className="info_more-btn absolute -top-4 -right-4 lg:hidden sketch-border py-2 px-4 text-[12px] font-bold bg-card text-foreground hover:bg-foreground hover:text-background transition-colors"
                    onClick={() => setIsActive(!isActive)}
                >
                    <span>{isActive ? 'Hide' : 'Show'} Contacts</span>
                </button>
            </div>

            <div className={`sidebar-info_more ${isActive ? 'block' : 'hidden'} lg:block transition-all duration-500`}>
                <div className="h-[1px] bg-border my-6"></div>

                <ul className="contacts-list space-y-[30px]">
                    {[
                        { title: "Email", value: "[EMAIL_ADDRESS]", link: "mailto:[EMAIL_ADDRESS]", icon: <Mail size={18} /> },
                        { title: "Phone", value: "+1 (213) 352-2795", link: "tel:+12133522795", icon: <Smartphone size={18} /> },
                        { title: "Birthday", value: "June 23, 1982", icon: <Calendar size={18} /> },
                        { title: "Location", value: "Sacramento, California, USA", icon: <MapPin size={18} /> }
                    ].map((contact, idx) => (
                        <li key={idx} className="contact-item flex items-center gap-3 group cursor-pointer">
                            <div className="w-[40px] h-[40px] flex-shrink-0 text-foreground text-lg bg-card sketch-border grayscale group-hover:grayscale-0 flex justify-center items-center group-hover:bg-accent-tertiary group-hover:text-foreground transition-all duration-300">
                                {contact.icon}
                            </div>
                            <div className="contact-info text-left overflow-hidden">
                                <p className="contact-title text-[11px] text-muted uppercase tracking-widest mb-1">{contact.title}</p>
                                {contact.link ? (
                                    <a href={contact.link} className="contact-link text-[14px] text-foreground group-hover:text-accent transition-colors break-words font-medium">{contact.value}</a>
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
                            <button className="text-muted hover:text-foreground transition-all duration-300 text-lg p-2 sketch-border hover:bg-foreground hover:text-background active:scale-95 grayscale hover:grayscale-0">
                                {ic.icon}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    );
}
