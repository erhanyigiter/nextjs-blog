"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

// Mock data - gerçek uygulamada API'den gelecek
const posts = [
  {
    id: '1',
    title: 'Next.js 15 ile Modern Web Geliştirme',
    slug: 'nextjs-15-modern-web-development',
    status: 'published',
    author: 'Erhan Yığiter',
    category: 'Teknoloji',
    tags: ['Next.js', 'React', 'JavaScript'],
    views: 1250,
    likes: 45,
    comments: 12,
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Mobile-First Tasarım Prensipleri',
    slug: 'mobile-first-design-principles',
    status: 'published',
    author: 'Erhan Yığiter',
    category: 'Tasarım',
    tags: ['UI/UX', 'Responsive'],
    views: 890,
    likes: 32,
    comments: 8,
    publishedAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: '3',
    title: 'SEO Optimizasyonu Rehberi',
    slug: 'seo-optimization-guide',
    status: 'draft',
    author: 'Erhan Yığiter',
    category: 'SEO',
    tags: ['SEO', 'Marketing'],
    views: 0,
    likes: 0,
    comments: 0,
    publishedAt: null,
    updatedAt: '2024-01-10T09:15:00Z',
  },
  {
    id: '4',
    title: 'Tailwind CSS En İyi Uygulamaları',
    slug: 'tailwind-css-best-practices',
    status: 'published',
    author: 'Erhan Yığiter',
    category: 'Teknoloji',
    tags: ['Tailwind CSS', 'CSS'],
    views: 1560,
    likes: 56,
    comments: 18,
    publishedAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
  },
  {
    id: '5',
    title: 'TypeScript Gelişmiş Desenler',
    slug: 'typescript-advanced-patterns',
    status: 'published',
    author: 'Erhan Yığiter',
    category: 'Teknoloji',
    tags: ['TypeScript', 'Programming'],
    views: 980,
    likes: 41,
    comments: 14,
    publishedAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-05T11:20:00Z',
  },
];

const categories = [
  { id: '1', name: 'Teknoloji', slug: 'technology' },
  { id: '2', name: 'Tasarım', slug: 'design' },
  { id: '3', name: 'SEO', slug: 'seo' },
  { id: '4', name: 'Geliştirme', slug: 'development' },
];

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Yazıları</h1>
          <p className="text-muted-foreground mt-2">
            Blog yazılarınızı yönetin ve düzenleyin.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">Yeni Yazı</Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Arama</label>
              <Input
                placeholder="Yazı başlığı veya yazar ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Durum</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="published">Yayında</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Kategori</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="w-full"
              >
                Filtreleri Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Yazılar ({filteredPosts.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Toplam {posts.length} yazı
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Yayında' : 'Taslak'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span>✍️ {post.author}</span>
                    <span>📁 {post.category}</span>
                    <span>🏷️ {post.tags.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>👁️ {formatNumber(post.views)}</span>
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>
                      {post.publishedAt ? `📅 ${formatDate(post.publishedAt)}` : '📝 Taslak'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/posts/${post.id}`}>Düzenle</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">Görüntüle</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Sil
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg mb-2">Yazı bulunamadı</p>
                <p className="text-sm">Filtreleri değiştirerek tekrar deneyin.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
