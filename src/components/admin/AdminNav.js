'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, User, Briefcase, FileText, MessageSquare, FolderKanban, Menu, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { label: 'Dashboard', href: '/admin',           icon: LayoutDashboard },
  { label: 'About',     href: '/admin/about',     icon: User },
  { label: 'Resume',    href: '/admin/resume',    icon: Briefcase },
  { label: 'Projects',  href: '/admin/projects',  icon: FolderKanban },
  { label: 'Blogs',     href: '/admin/blogs',     icon: FileText },
  { label: 'Messages',  href: '/admin/messages',  icon: MessageSquare },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Reset loggingOut whenever pathname changes — covers the case where
  // the user logs back in and the component is still mounted with stale state
  useEffect(() => {
    setLoggingOut(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  const isActive = (href) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  if (isLoginPage) return null;

  return (
    <>
      {/* Theme toggle — floats over everything */}
      <ThemeToggle />

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-56 flex-col bg-card border-r-2 border-dashed border-card-border z-40">
        <div className="px-5 py-5 border-b-2 border-dashed border-card-border">
          <span className="font-signature font-bold text-xl text-foreground">Portfolio</span>
          <p className="text-[10px] text-muted uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-colors duration-150 ${
                isActive(href)
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:text-foreground hover:bg-primary-light'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t-2 border-dashed border-card-border space-y-1">
          <Link
            target='_'
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-bold text-muted hover:text-foreground hover:bg-primary-light transition-colors"
          >
            <ExternalLink size={16} />
            View Portfolio
          </Link>
          <button
            onClick={handleLogout} disabled={loggingOut}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-bold text-muted hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
          {/* <p className="text-[10px] text-muted text-center pt-2 tracking-widest uppercase">
            © {new Date().getFullYear()} Iqbal Hossain
          </p> */}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b-2 border-dashed border-card-border h-14 flex items-center justify-between px-4">
        <span className="font-signature font-bold text-lg text-foreground">Portfolio Admin</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-1">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-14">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href} href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold border-2 transition-colors ${
                  isActive(href)
                    ? 'bg-foreground text-background border-foreground'
                    : 'text-muted border-card-border hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center gap-3 px-4 py-3 text-sm font-bold text-muted border-2 border-card-border hover:text-foreground"
            >
              <ExternalLink size={16} />
              View Portfolio
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 border-2 border-red-500/30"
            >
              <LogOut size={16} />
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
