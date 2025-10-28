import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/blog/BlogCard';

// Mock data - gerçek uygulamada API'den gelecek
const mockTag = {
  id: '1',
  slug: 'nextjs',
  name: 'Next.js',
  description: 'React tabanlı full-stack web framework\'ü. Server-side rendering, static site generation ve API routes gibi özellikler sunar.',
  color: '#000000',
  postCount: 8,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};

const mockPosts = [
  {
    id: '1',
    slug: 'nextjs-15-modern-web-development',
    title: 'Next.js 15 ile Modern Web Geliştirme',
    excerpt: 'Next.js 15\'in yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin. App Router, Server Components ve daha fazlası.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-15T10:00:00Z',
    viewCount: 1250,
    likeCount: 45,
    commentCount: 12,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: {
      id: '1',
      slug: 'technology',
      name: 'Teknoloji',
      color: '#3b82f6',
      icon: '💻'
    },
    tags: [
      { id: '1', slug: 'nextjs', name: 'Next.js', color: '#000000' },
      { id: '2', slug: 'react', name: 'React', color: '#61dafb' },
      { id: '3', slug: 'javascript', name: 'JavaScript', color: '#f7df1e' }
    ]
  },
  {
    id: '2',
    slug: 'nextjs-app-router-guide',
    title: 'Next.js App Router Rehberi',
    excerpt: 'Next.js 13+ ile gelen App Router\'ı nasıl kullanacağınızı öğrenin. Layout\'lar, loading states ve error handling.',
    featuredImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-12T14:30:00Z',
    viewCount: 980,
    likeCount: 38,
    commentCount: 15,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: {
      id: '1',
      slug: 'technology',
      name: 'Teknoloji',
      color: '#3b82f6',
      icon: '💻'
    },
    tags: [
      { id: '1', slug: 'nextjs', name: 'Next.js', color: '#000000' },
      { id: '4', slug: 'routing', name: 'Routing', color: '#8b5cf6' }
    ]
  },
  {
    id: '3',
    slug: 'nextjs-server-components',
    title: 'Next.js Server Components',
    excerpt: 'Server Components ile performanslı ve SEO dostu React uygulamaları nasıl geliştirilir?',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-08T16:45:00Z',
    viewCount: 1100,
    likeCount: 52,
    commentCount: 20,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: {
      id: '1',
      slug: 'technology',
      name: 'Teknoloji',
      color: '#3b82f6',
      icon: '💻'
    },
    tags: [
      { id: '1', slug: 'nextjs', name: 'Next.js', color: '#000000' },
      { id: '5', slug: 'server-components', name: 'Server Components', color: '#10b981' }
    ]
  }
];

const mockRelatedTags = [
  {
    id: '2',
    slug: 'react',
    name: 'React',
    color: '#61dafb',
    postCount: 12
  },
  {
    id: '3',
    slug: 'typescript',
    name: 'TypeScript',
    color: '#3178c6',
    postCount: 15
  },
  {
    id: '4',
    slug: 'tailwind-css',
    name: 'Tailwind CSS',
    color: '#06b6d4',
    postCount: 6
  },
  {
    id: '5',
    slug: 'nodejs',
    name: 'Node.js',
    color: '#339933',
    postCount: 10
  }
];

interface TagDetailPageProps {
  slug: string;
}

export default function TagDetailPage({ slug }: TagDetailPageProps) {
  // In a real app, fetch tag data based on slug
  const tag = mockTag; // For now, use mock data
  const posts = mockPosts;
  const relatedTags = mockRelatedTags;

  if (!tag) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Etiket Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">Aradığınız etiket mevcut değil.</p>
        <Link href="/tags">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Tüm Etiketler
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/tags" className="hover:text-foreground transition-colors">Etiketler</Link>
        <span>/</span>
        <span className="text-foreground">#{tag.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tag Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  #{tag.name}
                </h1>
                <Badge 
                  variant="secondary" 
                  className="mt-2"
                  style={{ backgroundColor: tag.color + '20', color: tag.color }}
                >
                  {tag.postCount} yazı
                </Badge>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {tag.description}
            </p>
          </div>

          {/* Posts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                #{tag.name} Etiketli Yazılar
              </h2>
              <div className="text-sm text-muted-foreground">
                {posts.length} yazı bulundu
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors">
                Önceki
              </button>
              <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors">
                Sonraki
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Tag Stats */}
          <Card className="blog-card p-6 mb-8">
            <CardTitle className="text-xl font-bold mb-4">Etiket İstatistikleri</CardTitle>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toplam Yazı</span>
                <span className="font-semibold">{tag.postCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ortalama Görüntülenme</span>
                <span className="font-semibold">
                  {Math.round(posts.reduce((sum, post) => sum + post.viewCount, 0) / posts.length).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toplam Yorum</span>
                <span className="font-semibold">
                  {posts.reduce((sum, post) => sum + post.commentCount, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Son Güncelleme</span>
                <span className="font-semibold">
                  {new Date(tag.updatedAt).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </Card>

          {/* Related Tags */}
          <Card className="blog-card p-6 mb-8">
            <CardTitle className="text-xl font-bold mb-4">İlgili Etiketler</CardTitle>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((relatedTag) => (
                <Link 
                  key={relatedTag.id} 
                  href={`/tags/${relatedTag.slug}`}
                  className="inline-block"
                >
                  <Badge 
                    variant="outline" 
                    className="hover:bg-muted transition-colors cursor-pointer"
                    style={{ 
                      borderColor: relatedTag.color + '40',
                      color: relatedTag.color 
                    }}
                  >
                    #{relatedTag.name} ({relatedTag.postCount})
                  </Badge>
                </Link>
              ))}
            </div>
          </Card>

          {/* Newsletter CTA */}
          <Card className="p-6 blog-card bg-secondary/20 border-dashed">
            <CardTitle className="text-xl font-bold mb-4">Bültenimize Abone Olun</CardTitle>
            <CardDescription className="text-muted-foreground mb-4">
              #{tag.name} etiketli yeni yazılarımızdan haberdar olun.
            </CardDescription>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="blog-input"
              />
              <button className="blog-button-primary">Abone Ol</button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
