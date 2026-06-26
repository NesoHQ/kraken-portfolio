'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, User, MessageSquare, Loader2, TrendingUp, Download } from 'lucide-react';

function StatCard({ label, value, sub, href, icon: Icon, loading }) {
  return (
    <Link
      href={href}
      className="bg-card border-2 border-dashed border-card-border p-5 hover:bg-primary-light hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 group block"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 border-2 border-dashed border-card-border flex items-center justify-center group-hover:border-foreground transition-colors">
          <Icon size={18} className="text-muted group-hover:text-foreground transition-colors" />
        </div>
        {loading
          ? <Loader2 size={14} className="animate-spin text-muted mt-1" />
          : <TrendingUp size={14} className="text-muted" />
        }
      </div>
      <div className="text-3xl font-signature font-bold text-foreground mb-1">
        {loading ? '—' : value}
      </div>
      <div className="text-sm font-bold text-foreground">{label}</div>
      {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(j => { setStats(j.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Blog Posts',
      value: stats?.totalBlogs ?? 0,
      sub: 'Published articles',
      href: '/admin/blogs',
      icon: FileText,
    },
    {
      label: 'Messages',
      value: stats?.totalMessages ?? 0,
      sub: stats?.unreadMessages ? `${stats.unreadMessages} unread` : 'All read',
      href: '/admin/messages',
      icon: MessageSquare,
    },
    {
      label: 'About',
      value: '1',
      sub: 'Profile & services',
      href: '/admin/about',
      icon: User,
    },
    {
      label: 'Resume Downloads',
      value: stats?.resumeDownloads ?? 0,
      sub: 'Sidebar button clicks',
      href: '/admin/about',
      icon: Download,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-signature font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Manage your portfolio content.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(card => (
          <StatCard key={card.href} {...card} loading={loading} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border-2 border-dashed border-card-border p-5">
          <h2 className="font-signature font-bold text-lg text-foreground mb-4 pb-3 border-b border-dashed border-card-border">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Write a new blog post', href: '/admin/blogs' },
              { label: 'Update about section', href: '/admin/about' },
              { label: 'Edit resume & experience', href: '/admin/resume' },
              { label: 'View contact messages', href: '/admin/messages' },
            ].map(a => (
              <Link
                key={a.href} href={a.href}
                className="flex items-center justify-between px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-primary-light transition-colors border border-transparent hover:border-card-border"
              >
                {a.label}
                <span className="text-xs">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border-2 border-dashed border-card-border p-5">
          <h2 className="font-signature font-bold text-lg text-foreground mb-4 pb-3 border-b border-dashed border-card-border">Overview</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Total blog posts</span>
              <span className="font-bold text-foreground">{loading ? '—' : stats?.totalBlogs ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Total messages</span>
              <span className="font-bold text-foreground">{loading ? '—' : stats?.totalMessages ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Unread messages</span>
              <span className={`font-bold ${stats?.unreadMessages ? 'text-foreground' : 'text-muted'}`}>
                {loading ? '—' : stats?.unreadMessages ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Resume downloads</span>
              <span className="font-bold text-foreground">{loading ? '—' : stats?.resumeDownloads ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
