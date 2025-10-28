import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogCard } from '@/components/blog/BlogCard';

// Mock data - gerçek uygulamada API'den gelecek
const mockCategory = {
  id: '1',
  slug: 'technology',
  name: 'Teknoloji',
  description: 'Web geliştirme, programlama ve teknoloji trendleri hakkında yazılar. Modern teknolojiler, framework\'ler ve geliştirme araçları üzerine derinlemesine içerikler.',
  color: '#3b82f6',
  icon: '💻',
  postCount: 12,
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
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript Gelişmiş Desenler',
    excerpt: 'TypeScript ile daha güvenli ve ölçeklenebilir kod yazma teknikleri. Generics, utility types ve advanced patterns.',
    featuredImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-05T11:20:00Z',
    viewCount: 980,
    likeCount: 41,
    commentCount: 14,
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
      { id: '10', slug: 'typescript', name: 'TypeScript', color: '#3178c6' },
      { id: '11', slug: 'programming', name: 'Programming', color: '#000000' }
    ]
  },
  {
    id: '3',
    slug: 'nodejs-backend-development',
    title: 'Node.js ile Backend Geliştirme',
    excerpt: 'Node.js kullanarak ölçeklenebilir ve güvenli backend uygulamaları geliştirme teknikleri.',
    featuredImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-20T14:30:00Z',
    viewCount: 1100,
    likeCount: 52,
    commentCount: 18,
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
      { id: '12', slug: 'nodejs', name: 'Node.js', color: '#339933' },
      { id: '13', slug: 'backend', name: 'Backend', color: '#000000' }
    ]
  }
];

const mockRelatedCategories = [
  {
    id: '2',
    slug: 'design',
    name: 'Tasarım',
    color: '#10b981',
    icon: '🎨',
    postCount: 8
  },
  {
    id: '3',
    slug: 'seo',
    name: 'SEO',
    color: '#8b5cf6',
    icon: '📈',
    postCount: 6
  },
  {
    id: '4',
    slug: 'development',
    name: 'Geliştirme',
    color: '#f59e0b',
    icon: '🚀',
    postCount: 15
  }
];

interface CategoryDetailPageProps {
  slug: string;
}

export default function CategoryDetailPage({ slug }: CategoryDetailPageProps) {
  // In a real app, fetch category data based on slug
  const category = mockCategory; // For now, use mock data
  const posts = mockPosts;
  const relatedCategories = mockRelatedCategories;

  if (!category) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Kategori Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">Aradığınız kategori mevcut değil.</p>
        <Link href="/categories">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Tüm Kategoriler
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
        <Link href="/categories" className="hover:text-foreground transition-colors">Kategoriler</Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: category.color + '20' }}
              >
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {category.name}
                </h1>
                <Badge 
                  variant="secondary" 
                  className="mt-2"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.postCount} yazı
                </Badge>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Posts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {category.name} Yazıları
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
          {/* Category Stats */}
          <Card className="blog-card p-6 mb-8">
            <CardTitle className="text-xl font-bold mb-4">Kategori İstatistikleri</CardTitle>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toplam Yazı</span>
                <span className="font-semibold">{category.postCount}</span>
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
                  {new Date(category.updatedAt).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </Card>

          {/* Related Categories */}
          <Card className="blog-card p-6 mb-8">
            <CardTitle className="text-xl font-bold mb-4">İlgili Kategoriler</CardTitle>
            <div className="space-y-3">
              {relatedCategories.map((relatedCategory) => (
                <Link 
                  key={relatedCategory.id} 
                  href={`/categories/${relatedCategory.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: relatedCategory.color + '20' }}
                  >
                    {relatedCategory.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{relatedCategory.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {relatedCategory.postCount} yazı
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Newsletter CTA */}
          <Card className="p-6 blog-card bg-secondary/20 border-dashed">
            <CardTitle className="text-xl font-bold mb-4">Bültenimize Abone Olun</CardTitle>
            <CardDescription className="text-muted-foreground mb-4">
              {category.name} kategorisindeki yeni yazılarımızdan haberdar olun.
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
