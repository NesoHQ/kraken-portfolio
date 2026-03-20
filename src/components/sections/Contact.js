"use client";

import { useState } from 'react';

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";

export function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: form.fullname.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });
      if (res.ok) { setStatus('sent'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };
  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          Contact
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      <section className="mb-12 sketch-border">
        <figure className="h-[300px] w-full bg-card p-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.3263788778!2d90.27923950507813!3d23.780573000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            width="600" height="450" loading="lazy"
            className="w-full h-full border-2 border-dashed border-foreground"
          />
        </figure>
      </section>

      <section>
        <h3 className="text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3">
          <span className="text-2xl">✦</span> Get In Touch
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="fullname" className="w-full bg-background border-2 border-dashed border-foreground sketch-border px-4 py-3 text-base text-foreground outline-none focus:bg-primary-light transition-all placeholder:text-muted focus:ring-2 focus:ring-foreground focus:ring-offset-2" placeholder="Full name" required />
            <input type="email" name="email" className="w-full bg-background border-2 border-dashed border-foreground sketch-border px-4 py-3 text-base text-foreground outline-none focus:bg-primary-light transition-all placeholder:text-muted focus:ring-2 focus:ring-foreground focus:ring-offset-2" placeholder="Email address" required />
          </div>
          <textarea name="message" className="w-full bg-background border-2 border-dashed border-foreground sketch-border px-4 py-4 text-base text-foreground outline-none focus:bg-primary-light transition-all min-h-[120px] placeholder:text-muted resize-none focus:ring-2 focus:ring-foreground focus:ring-offset-2" placeholder="Your Message" required />

          {status === 'sent' && <p className="text-sm font-bold text-foreground bg-primary-light px-4 py-3 sketch-border">✓ Message sent! I&apos;ll get back to you soon.</p>}
          {status === 'error' && <p className="text-sm font-bold text-red-500 bg-red-500/10 px-4 py-3 sketch-border">Something went wrong. Please try again.</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={status === 'sending'} className="bg-foreground text-background py-3 px-8 sketch-border font-signature font-bold text-2xl flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}
