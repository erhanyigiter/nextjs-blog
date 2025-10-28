import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-xl font-bold text-foreground">NextBlog</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Kategoriler
              </Link>
              <Link href="/tags" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Etiketler
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Hakkımızda
              </Link>
            </nav>

            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-primary"></div>
                <span className="text-lg font-semibold">NextBlog</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern, hızlı ve SEO dostu blog platformu. Next.js 15 ve Turbo ile güçlendirilmiş.
              </p>
            </div>
            
            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Bağlantılar</h3>
              <div className="space-y-2">
                <a href="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog Yazıları
                </a>
                <a href="/categories" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Kategoriler
                </a>
                <a href="/tags" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Etiketler
                </a>
              </div>
            </div>
            
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">İletişim</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email: info@nextblog.com</p>
                <p className="text-sm text-muted-foreground">Telefon: +90 555 123 45 67</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 NextBlog. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
