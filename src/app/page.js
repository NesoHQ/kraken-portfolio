"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Palette, Code, Smartphone, Camera, User, GraduationCap, Briefcase, PenTool } from "lucide-react";

export default function PortfolioPage() {
  const [activePage, setActivePage] = useState("about");
  const [portfolioFilter, setPortfolioFilter] = useState("All");

  const renderSection = () => {
    switch (activePage) {
      case "about":
        return (
          <article className="active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]">
            <header className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
                About me
                <div className="flex-1 h-[3px] bg-foreground mt-2"></div>
              </h2>
            </header>

            <section className="about-text text-muted text-base lg:text-lg leading-relaxed space-y-6 font-light mb-12">
              <p>
                I&apos;m Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media.
                I enjoy turning complex problems into simple, beautiful and intuitive designs.
              </p>
              <p>
                My job is to build your website so that it is functional and user-friendly but at the same time attractive.
                Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use.
                My aim is to bring across your message and identity in the most creative way.
                I created web design for many famous brand companies.
              </p>
            </section>

            <section className="service mb-12">
              <h3 className="text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="text-foreground text-2xl">✦</span> What i'm doing
              </h3>
              <ul className="service-list grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Web design", text: "The most modern and high-quality design made at a professional level.", icon: <Palette size={32} /> },
                  { title: "Web development", text: "High-quality development of sites at the professional level.", icon: <Code size={32} /> },
                  { title: "Mobile apps", text: "Professional development of applications for iOS and Android.", icon: <Smartphone size={32} /> },
                  { title: "Photography", text: "I make high-quality photos of any category at a professional level.", icon: <Camera size={32} /> }
                ].map((s, idx) => (
                  <li key={idx} className="bg-card p-6 sketch-border flex items-start flex-col gap-4 hover:translate-x-1 hover:translate-y-1 transition-all duration-300 group relative hover:bg-primary-light">
                    <div className="text-4xl text-foreground shrink-0 bg-transparent w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      {s.icon}
                    </div>
                    <div className="service-content-box">
                      <h4 className="font-signature font-bold text-2xl text-foreground mb-2">{s.title}</h4>
                      <p className="text-sm lg:text-base text-muted leading-relaxed font-light">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="testimonials mb-12 overflow-visible">
              <h3 className="text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="text-foreground text-2xl">✦</span> Testimonials
              </h3>
              <ul className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide py-4 snap-x">
                {[
                  { name: "Daniel Lewis", text: "Richard was hired to create a corporate identity. We were very pleased with the work...", avatar: <User size={24} /> },
                  { name: "Jessica Miller", text: "Richard was hired to create a corporate identity. We were very pleased with the work...", avatar: <User size={24} /> }
                ].map((t, i) => (
                  <li key={i} className="shrink-0 w-full md:w-[48%] bg-card sketch-border p-6 relative snap-center duration-300 hover:bg-primary-light">
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="w-12 h-12 sketch-border bg-card flex shrink-0 items-center justify-center text-2xl">
                        {t.avatar}
                      </div>
                      <h4 className="font-signature font-bold text-2xl text-foreground">{t.name}</h4>
                    </div>
                    <p className="text-sm lg:text-base text-muted italic font-light line-clamp-3 leading-relaxed relative z-10">"{t.text}"</p>
                    <div className="text-6xl absolute top-2 right-4 text-foreground/10 font-signature font-bold leading-none select-none pointer-events-none z-0">"</div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="clients">
              <h3 className="text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="text-foreground text-2xl">✦</span> Clients
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(c => (
                  <li key={c} className="flex items-center justify-center py-6 sketch-border bg-card hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer group">
                    <div className="text-lg font-signature font-bold tracking-widest text-muted group-hover:text-background transition-colors duration-300">BRAND {c}</div>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        );
      case "resume":
        return (
          <article className="active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]">
            <header className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
                Resume
                <div className="flex-1 h-[3px] bg-foreground mt-2"></div>
              </h2>
            </header>

            <section className="timeline mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-card sketch-border flex items-center justify-center text-foreground">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-signature font-bold text-foreground">Education</h3>
              </div>

              <ol className="ml-6 border-l-2 border-foreground border-dashed pl-8 space-y-10 relative">
                {[
                  { title: "University school of the arts", period: "2007 — 2008", text: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur." },
                  { title: "New york academy of art", period: "2006 — 2007", text: "Ratione voluptatem sequi nesciunt, facere quisquams menda ossimus, omnis voluptas assumenda est omnis.." },
                  { title: "High school of art and design", period: "2002 — 2004", text: "Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos." }
                ].map((item, idx) => (
                  <li key={idx} className="relative group">
                    <div className="absolute -left-[41px] top-[6px] w-[18px] h-[18px] bg-background border-[3px] border-foreground group-hover:bg-foreground transition-all duration-300"></div>
                    <h4 className="font-signature font-bold text-2xl text-foreground mb-1">{item.title}</h4>
                    <span className="text-muted text-xs lg:text-sm font-bold tracking-widest block mb-2 uppercase">{item.period}</span>
                    <p className="text-muted font-light leading-relaxed text-sm lg:text-base">{item.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="timeline mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-card sketch-border flex items-center justify-center text-foreground">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-signature font-bold text-foreground">Experience</h3>
              </div>

              <ol className="ml-6 border-l-2 border-foreground border-dashed pl-8 space-y-10 relative">
                {[
                  { title: "Creative director", period: "2015 — Present", text: "Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti, quos dolores et qvuas molestias exceptur." },
                  { title: "Art director", period: "2013 — 2015", text: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur." },
                  { title: "Web designer", period: "2010 — 2013", text: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur." }
                ].map((item, idx) => (
                  <li key={idx} className="relative group">
                    <div className="absolute -left-[41px] top-[6px] w-[18px] h-[18px] bg-background border-[3px] border-foreground group-hover:bg-foreground transition-all duration-300"></div>
                    <h4 className="font-signature font-bold text-2xl text-foreground mb-1">{item.title}</h4>
                    <span className="text-muted text-xs lg:text-sm font-bold tracking-widest block mb-2 uppercase">{item.period}</span>
                    <p className="text-muted font-light leading-relaxed text-sm lg:text-base">{item.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="skill">
              <h3 className="text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="text-foreground text-2xl">✦</span> My skills
              </h3>
              <ul className="bg-card p-6 sketch-border space-y-6">
                {[
                  { title: "Web design", value: 80 },
                  { title: "Graphic design", value: 70 },
                  { title: "Branding", value: 90 },
                  { title: "WordPress", value: 50 }
                ].map((skill, idx) => (
                  <li key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-foreground font-signature text-xl uppercase tracking-wider">{skill.title}</h5>
                      <span className="text-foreground font-bold bg-primary text-background px-3 py-1 sketch-border">{skill.value}%</span>
                    </div>
                    <div className="bg-background border-2 border-foreground h-4 w-full sketch-border overflow-hidden flex p-[2px]">
                      <div className="bg-foreground h-full transition-all duration-1000 relative" style={{ width: `${skill.value}%` }}>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        );
      case "portfolio":
        const projects = [
          { title: "Finance", category: "Web development", img: "/old/assets/images/project-1.jpg" },
          { title: "Orizon", category: "Web development", img: "/old/assets/images/project-2.png" },
          { title: "Fundo", category: "Web design", img: "/old/assets/images/project-3.jpg" },
          { title: "Brawlhalla", category: "Applications", img: "/old/assets/images/project-4.png" },
          { title: "DSM.", category: "Web design", img: "/old/assets/images/project-5.png" },
          { title: "MetaSpark", category: "Web design", img: "/old/assets/images/project-6.png" },
          { title: "Summary", category: "Web development", img: "/old/assets/images/project-7.png" },
          { title: "Task Manager", category: "Applications", img: "/old/assets/images/project-8.jpg" },
          { title: "Arrival", category: "Web development", img: "/old/assets/images/project-9.png" }
        ];
        const filteredProjects = portfolioFilter === "All" ? projects : projects.filter(p => p.category === portfolioFilter);

        return (
          <article className="active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]">
            <header className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
                Portfolio
                <div className="flex-1 h-[3px] bg-foreground mt-2"></div>
              </h2>
            </header>

            <section className="projects">
              <ul className="flex gap-6 md:gap-10 mb-10 overflow-x-auto pb-4 scrollbar-hide border-b-2 border-foreground border-dashed">
                {["All", "Web design", "Applications", "Web development"].map(f => (
                  <li key={f} className="shrink-0">
                    <button
                      onClick={() => setPortfolioFilter(f)}
                      className={`text-lg lg:text-xl font-signature font-bold pb-2 border-b-[3px] transition-all duration-300 whitespace-nowrap ${portfolioFilter === f ? 'text-foreground border-foreground scale-105' : 'text-muted border-transparent hover:text-foreground hover:border-border'}`}
                    >
                      {f}
                    </button>
                  </li>
                ))}
              </ul>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => (
                  <li key={idx} className="group cursor-pointer">
                    <figure className="relative sketch-border overflow-hidden mb-4 aspect-4/3 bg-card p-1 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 group-hover:bg-primary-light">
                      <div className="absolute inset-0 bg-background/50 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="p-3 bg-foreground text-background sketch-border translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </div>
                      </div>
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                    </figure>
                    <h3 className="text-xl font-signature font-bold text-foreground mb-1 ml-1">{project.title}</h3>
                    <p className="text-xs lg:text-sm text-muted font-bold ml-1 uppercase tracking-wider">{project.category}</p>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        );
      case "blog":
        const blogs = [
          { title: "Design conferences in 2022", category: "Design", date: "Feb 23, 2022", text: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.", img: "/old/assets/images/blog-1.jpg" },
          { title: "Best fonts every designer", category: "Design", date: "Feb 23, 2022", text: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.", img: "/old/assets/images/blog-2.jpg" },
          { title: "Design digest #80", category: "Design", date: "Feb 23, 2022", text: "Excepteur sint occaecat cupidatat non proident, quis nostrum exercitationem.", img: "/old/assets/images/blog-3.jpg" },
          { title: "UI interactions of the week", category: "Design", date: "Feb 23, 2022", text: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.", img: "/old/assets/images/blog-4.jpg" },
          { title: "The forgotten art of spacing", category: "Design", date: "Feb 23, 2022", text: "Ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum.", img: "/old/assets/images/blog-5.jpg" },
          { title: "Design digest #79", category: "Design", date: "Feb 23, 2022", text: "Optio cumque nihil impedit quo minus id quod maxime placeat.", img: "/old/assets/images/blog-6.jpg" }
        ];

        return (
          <article className="active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]">
            <header className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
                Blog
                <div className="flex-1 h-[3px] bg-foreground mt-2"></div>
              </h2>
            </header>

            <section>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog, idx) => (
                  <li key={idx} className="group">
                    <a href="#" className="block w-full h-full bg-card sketch-border overflow-hidden hover:translate-x-1 hover:translate-y-1 transition-all duration-300 hover:bg-primary-light">
                      <figure className="relative overflow-hidden aspect-[1.8/1] border-b-2 border-foreground transition-all duration-500">
                        <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
                          <span className="text-background"><PenTool size={14} /></span> {blog.category}
                        </div>
                      </figure>
                      <div className="p-5 lg:p-6 relative">
                        <time dateTime="2022-02-23" className="block text-xs lg:text-sm text-muted font-bold tracking-widest uppercase mb-2">{blog.date}</time>
                        <h3 className="text-2xl font-signature font-bold text-foreground mb-2 leading-snug">{blog.title}</h3>
                        <p className="text-muted leading-relaxed line-clamp-2 text-sm lg:text-base">{blog.text}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        );
      case "contact":
        return (
          <article className="active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]">
            <header className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
                Contact
                <div className="flex-1 h-[3px] bg-foreground mt-2"></div>
              </h2>
            </header>

            <section className="map-container mb-12 border-2 border-foreground sketch-border transition-all duration-700">
              <figure className="h-[300px] w-full bg-card p-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x7a1a631f13b6999a!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
                  width="600" height="450" loading="lazy" className="w-full h-full border-2 border-foreground"></iframe>
              </figure>
            </section>

            <section className="contact-form">
              <h3 className="text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="text-foreground text-2xl">✦</span> Get In Touch
              </h3>
              <form action="#" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="text" name="fullname" className="w-full bg-background border-2 border-foreground sketch-border px-4 py-3 text-base text-foreground outline-none focus:bg-primary-light transition-all placeholder:text-muted hover:translate-x-[2px] hover:translate-y-[2px] focus:ring-2 focus:ring-foreground focus:ring-offset-2" placeholder="Full name" required />
                  </div>
                  <div className="relative group">
                    <input type="email" name="email" className="w-full bg-background border-2 border-foreground sketch-border px-4 py-3 text-base text-foreground outline-none focus:bg-primary-light transition-all placeholder:text-muted hover:translate-x-[2px] hover:translate-y-[2px] focus:ring-2 focus:ring-foreground focus:ring-offset-2" placeholder="Email address" required />
                  </div>
                </div>
                <div className="relative group">
                  <textarea name="message" className="w-full bg-background border-2 border-foreground sketch-border px-4 py-4 text-base text-foreground outline-none focus:bg-primary-light transition-all min-h-[120px] placeholder:text-muted hover:translate-x-[2px] hover:translate-y-[2px] resize-none focus:ring-2 focus:ring-foreground focus:ring-offset-2" placeholder="Your Message" required></textarea>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-foreground text-background py-3 px-8 sketch-border font-signature font-bold text-2xl flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 group hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </section>
          </article>
        );
      default:
        return null;
    }
  };

  return (
    <main className="w-full max-w-[1200px] mt-[30px] mx-auto flex flex-col gap-5 relative pb-[110px] lg:flex-row lg:items-start lg:mt-[60px] lg:pb-[60px] lg:gap-[25px]">
      <Sidebar />
      <div className="flex-1 w-full relative min-h-0">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        {renderSection()}
      </div>
      <ThemeToggle />
    </main>
  );
}
