"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data - gerçek uygulamada API'den gelecek
const stats = {
  totalPosts: 24,
  publishedPosts: 18,
  draftPosts: 6,
  totalUsers: 156,
  activeUsers: 142,
  totalComments: 89,
  pendingComments: 12,
  totalViews: 15420,
  monthlyViews: 3240,
};

const recentPosts = [
  {
    id: '1',
    title: 'Next.js 15 ile Modern Web Geliştirme',
    status: 'published',
    views: 1250,
    comments: 12,
    publishedAt: '2024-01-15T10:00:00Z',
    author: 'Erhan Yığiter',
  },
  {
    id: '2',
    title: 'Mobile-First Tasarım Prensipleri',
    status: 'published',
    views: 890,
    comments: 8,
    publishedAt: '2024-01-12T14:30:00Z',
    author: 'Erhan Yığiter',
  },
  {
    id: '3',
    title: 'SEO Optimizasyonu Rehberi',
    status: 'draft',
    views: 0,
    comments: 0,
    publishedAt: null,
    author: 'Erhan Yığiter',
  },
];

const recentComments = [
  {
    id: '1',
    author: 'Ahmet Yılmaz',
    content: 'Çok faydalı bir yazı olmuş, teşekkürler!',
    postTitle: 'Next.js 15 ile Modern Web Geliştirme',
    status: 'approved',
    createdAt: '2024-01-16T09:30:00Z',
  },
  {
    id: '2',
    author: 'Mehmet Kaya',
    content: 'Bu konuda daha detaylı bilgi verebilir misiniz?',
    postTitle: 'Mobile-First Tasarım Prensipleri',
    status: 'pending',
    createdAt: '2024-01-15T16:45:00Z',
  },
  {
    id: '3',
    author: 'Ayşe Demir',
    content: 'Harika bir rehber, çok işime yaradı.',
    postTitle: 'Tailwind CSS En İyi Uygulamaları',
    status: 'approved',
    createdAt: '2024-01-14T11:20:00Z',
  },
];

export default function AdminDashboard() {
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

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Hoş geldiniz! İşte sitenizin genel durumu.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Yazı</CardTitle>
            <span className="text-2xl">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPosts} yayında, {stats.draftPosts} taslak
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} aktif kullanıcı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Yorum</CardTitle>
            <span className="text-2xl">💬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingComments} onay bekliyor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görüntüleme</CardTitle>
            <span className="text-2xl">👁️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalViews)}</div>
            <p className="text-xs text-muted-foreground">
              Bu ay {formatNumber(stats.monthlyViews)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>
            Sık kullanılan işlemleri buradan gerçekleştirebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-20 flex-col space-y-2">
              <Link href="/admin/posts/new">
                <span className="text-2xl">✏️</span>
                <span>Yeni Yazı</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col space-y-2">
              <Link href="/admin/categories/new">
                <span className="text-2xl">📁</span>
                <span>Yeni Kategori</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col space-y-2">
              <Link href="/admin/comments">
                <span className="text-2xl">💬</span>
                <span>Yorumları İncele</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col space-y-2">
              <Link href="/admin/media">
                <span className="text-2xl">🖼️</span>
                <span>Medya Yönetimi</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts and Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Yazılar</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/posts">Tümünü Gör</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{post.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status === 'published' ? 'Yayında' : 'Taslak'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.publishedAt ? formatDate(post.publishedAt) : 'Yayınlanmadı'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>👁️ {formatNumber(post.views)}</span>
                      <span>💬 {post.comments}</span>
                      <span>✍️ {post.author}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/posts/${post.id}`}>Düzenle</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Yorumlar</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/comments">Tümünü Gör</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{comment.author}</h4>
                      <p className="text-sm text-muted-foreground">{comment.postTitle}</p>
                    </div>
                    <Badge variant={comment.status === 'approved' ? 'default' : 'secondary'}>
                      {comment.status === 'approved' ? 'Onaylandı' : 'Bekliyor'}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2 line-clamp-2">{comment.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Onayla</Button>
                      <Button variant="ghost" size="sm">Reddet</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
