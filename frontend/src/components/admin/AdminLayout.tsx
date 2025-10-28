"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: '📊',
  },
  {
    name: 'Blog Yazıları',
    href: '/admin/posts',
    icon: '📝',
  },
  {
    name: 'Kategoriler',
    href: '/admin/categories',
    icon: '📁',
  },
  {
    name: 'Etiketler',
    href: '/admin/tags',
    icon: '🏷️',
  },
  {
    name: 'Kullanıcılar',
    href: '/admin/users',
    icon: '👥',
  },
  {
    name: 'Yorumlar',
    href: '/admin/comments',
    icon: '💬',
  },
  {
    name: 'Medya',
    href: '/admin/media',
    icon: '🖼️',
  },
  {
    name: 'Ayarlar',
    href: '/admin/settings',
    icon: '⚙️',
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-xl font-bold">NextBlog Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium">EY</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Erhan Yığiter</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs"
                asChild
              >
                <Link href="/admin/profile">Profil</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              ☰
            </Button>
            <h1 className="text-lg font-semibold">
              {navigation.find(item => item.href === pathname)?.name || 'Admin Panel'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm">
              🔔
            </Button>
            
            {/* Back to site */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Siteye Dön</Link>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
