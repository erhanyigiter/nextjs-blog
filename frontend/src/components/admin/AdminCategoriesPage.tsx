"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data - gerçek uygulamada API'den gelecek
const categories = [
  {
    id: '1',
    name: 'Teknoloji',
    slug: 'technology',
    description: 'Teknoloji ve yazılım geliştirme konuları',
    color: '#3b82f6',
    icon: '💻',
    postCount: 12,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Tasarım',
    slug: 'design',
    description: 'UI/UX tasarım ve görsel tasarım konuları',
    color: '#10b981',
    icon: '🎨',
    postCount: 8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: '3',
    name: 'SEO',
    slug: 'seo',
    description: 'Arama motoru optimizasyonu ve dijital pazarlama',
    color: '#8b5cf6',
    icon: '📈',
    postCount: 6,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
  },
  {
    id: '4',
    name: 'Geliştirme',
    slug: 'development',
    description: 'Yazılım geliştirme süreçleri ve metodolojileri',
    color: '#f59e0b',
    icon: '🚀',
    postCount: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
  },
  {
    id: '5',
    name: 'Eğitim',
    slug: 'education',
    description: 'Eğitim ve öğrenme konuları',
    color: '#ef4444',
    icon: '📚',
    postCount: 0,
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kategoriler</h1>
          <p className="text-muted-foreground mt-2">
            Blog kategorilerini yönetin ve düzenleyin.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">Yeni Kategori</Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Ara</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Kategori adı veya açıklama ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.postCount} yazı
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={category.isActive ? 'default' : 'secondary'}>
                  {category.isActive ? 'Aktif' : 'Pasif'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Slug: {category.slug}</span>
                <span>Renk: {category.color}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Oluşturulma: {formatDate(category.createdAt)}</span>
                <span>Güncelleme: {formatDate(category.updatedAt)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/admin/categories/${category.id}`}>Düzenle</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/categories/${category.slug}`} target="_blank">Görüntüle</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-lg text-muted-foreground mb-2">Kategori bulunamadı</p>
            <p className="text-sm text-muted-foreground mb-4">
              Arama terimini değiştirerek tekrar deneyin.
            </p>
            <Button asChild>
              <Link href="/admin/categories/new">İlk Kategoriyi Oluştur</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {categories.length}
              </div>
              <div className="text-sm text-muted-foreground">Toplam Kategori</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {categories.filter(c => c.isActive).length}
              </div>
              <div className="text-sm text-muted-foreground">Aktif Kategori</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {categories.filter(c => !c.isActive).length}
              </div>
              <div className="text-sm text-muted-foreground">Pasif Kategori</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {categories.reduce((sum, c) => sum + c.postCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Toplam Yazı</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
