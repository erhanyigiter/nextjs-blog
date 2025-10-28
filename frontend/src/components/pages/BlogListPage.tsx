import React from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock data - gerçek uygulamada API'den gelecek
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
    slug: 'mobile-first-design-principles',
    title: 'Mobile-First Tasarım Prensipleri',
    excerpt: 'Mobil öncelikli tasarım yaklaşımı ile kullanıcı deneyimini nasıl iyileştirirsiniz? Responsive design ve modern UI/UX.',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-12T14:30:00Z',
    viewCount: 890,
    likeCount: 32,
    commentCount: 8,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: {
      id: '2',
      slug: 'design',
      name: 'Tasarım',
      color: '#10b981',
      icon: '🎨'
    },
    tags: [
      { id: '4', slug: 'ui-ux', name: 'UI/UX', color: '#8b5cf6' },
      { id: '5', slug: 'responsive', name: 'Responsive', color: '#f59e0b' }
    ]
  },
  {
    id: '3',
    slug: 'seo-optimization-guide',
    title: 'SEO Optimizasyonu Rehberi',
    excerpt: 'Blog yazılarınızı arama motorlarında üst sıralara çıkarmanın yolları. Meta tags, structured data ve daha fazlası.',
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-10T09:15:00Z',
    viewCount: 2100,
    likeCount: 78,
    commentCount: 25,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: {
      id: '3',
      slug: 'seo',
      name: 'SEO',
      color: '#8b5cf6',
      icon: '📈'
    },
    tags: [
      { id: '6', slug: 'seo', name: 'SEO', color: '#8b5cf6' },
      { id: '7', slug: 'marketing', name: 'Marketing', color: '#ef4444' }
    ]
  },
  {
    id: '4',
    slug: 'tailwind-css-best-practices',
    title: 'Tailwind CSS En İyi Uygulamaları',
    excerpt: 'Tailwind CSS ile daha verimli ve sürdürülebilir CSS yazma teknikleri. Component-based design ve utility-first yaklaşım.',
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-08T16:45:00Z',
    viewCount: 1560,
    likeCount: 56,
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
      { id: '8', slug: 'tailwind', name: 'Tailwind CSS', color: '#06b6d4' },
      { id: '9', slug: 'css', name: 'CSS', color: '#1572b6' }
    ]
  },
  {
    id: '5',
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
      { id: '11', slug: 'programming', name: 'Programming', color: '#f7df1e' }
    ]
  },
  {
    id: '6',
    slug: 'performance-optimization-tips',
    title: 'Web Performans Optimizasyonu İpuçları',
    excerpt: 'Web sitenizin hızını artırmanın yolları. Bundle optimization, lazy loading, caching ve daha fazlası.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=center',
    publishedAt: '2024-01-03T13:10:00Z',
    viewCount: 1340,
    likeCount: 63,
    commentCount: 21,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: {
      id: '4',
      slug: 'development',
      name: 'Geliştirme',
      color: '#f59e0b',
      icon: '🚀'
    },
    tags: [
      { id: '12', slug: 'performance', name: 'Performance', color: '#10b981' },
      { id: '13', slug: 'optimization', name: 'Optimization', color: '#ef4444' }
    ]
  }
];

const mockCategories = [
  { id: '1', slug: 'technology', name: 'Teknoloji', color: '#3b82f6' },
  { id: '2', slug: 'design', name: 'Tasarım', color: '#10b981' },
  { id: '3', slug: 'seo', name: 'SEO', color: '#8b5cf6' },
  { id: '4', slug: 'development', name: 'Geliştirme', color: '#f59e0b' }
];

const mockTags = [
  { id: '1', slug: 'nextjs', name: 'Next.js' },
  { id: '2', slug: 'react', name: 'React' },
  { id: '3', slug: 'javascript', name: 'JavaScript' },
  { id: '4', slug: 'ui-ux', name: 'UI/UX' },
  { id: '5', slug: 'responsive', name: 'Responsive' },
  { id: '6', slug: 'seo', name: 'SEO' },
  { id: '7', slug: 'marketing', name: 'Marketing' },
  { id: '8', slug: 'tailwind', name: 'Tailwind CSS' },
  { id: '9', slug: 'css', name: 'CSS' },
  { id: '10', slug: 'typescript', name: 'TypeScript' },
  { id: '11', slug: 'programming', name: 'Programming' },
  { id: '12', slug: 'performance', name: 'Performance' },
  { id: '13', slug: 'optimization', name: 'Optimization' }
];

export default function BlogListPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Blog Yazıları
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Teknoloji, tasarım ve geliştirme konularında güncel yazılarımızı keşfedin.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <Input 
              placeholder="Yazılarda ara..." 
              className="blog-input"
            />
          </div>
          
          {/* Category Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Kategori seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Sort */}
          <Select defaultValue="newest">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sırala" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">En Yeni</SelectItem>
              <SelectItem value="oldest">En Eski</SelectItem>
              <SelectItem value="popular">En Popüler</SelectItem>
              <SelectItem value="most-viewed">En Çok Okunan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Popular Tags */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Popüler Etiketler</h3>
          <div className="flex flex-wrap gap-2">
            {mockTags.slice(0, 8).map((tag) => (
              <Badge key={tag.id} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Öne Çıkan Yazı</h2>
        <div className="max-w-5xl mx-auto">
          <BlogCard post={mockPosts[0]} variant="featured" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Tüm Yazılar</h2>
          <div className="text-sm text-muted-foreground">
            {mockPosts.length} yazı bulundu
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockPosts.slice(1).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Önceki
        </Button>
        <div className="flex gap-1">
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
        </div>
        <Button variant="outline" size="sm">
          Sonraki
        </Button>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Yeni Yazıları Kaçırmayın
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            En son yazılarımızı ve teknoloji haberlerini e-posta ile alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="E-posta adresiniz"
              className="blog-input flex-1"
            />
            <Button className="blog-button-primary">
              Abone Ol
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
