"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

// Mock data - gerçek uygulamada API'den gelecek
const comments = [
  {
    id: '1',
    author: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    content: 'Çok faydalı bir yazı olmuş, teşekkürler! Next.js hakkında daha fazla yazı bekliyorum.',
    postTitle: 'Next.js 15 ile Modern Web Geliştirme',
    postSlug: 'nextjs-15-modern-web-development',
    status: 'approved',
    isSpam: false,
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
  },
  {
    id: '2',
    author: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    content: 'Bu konuda daha detaylı bilgi verebilir misiniz? Özellikle performance optimizasyonu hakkında.',
    postTitle: 'Mobile-First Tasarım Prensipleri',
    postSlug: 'mobile-first-design-principles',
    status: 'pending',
    isSpam: false,
    createdAt: '2024-01-15T16:45:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
  },
  {
    id: '3',
    author: 'Ayşe Demir',
    email: 'ayse@example.com',
    content: 'Harika bir rehber, çok işime yaradı. Tailwind CSS ile ilgili daha fazla örnek görmek istiyorum.',
    postTitle: 'Tailwind CSS En İyi Uygulamaları',
    postSlug: 'tailwind-css-best-practices',
    status: 'approved',
    isSpam: false,
    createdAt: '2024-01-14T11:20:00Z',
    updatedAt: '2024-01-14T11:20:00Z',
  },
  {
    id: '4',
    author: 'Spam User',
    email: 'spam@spam.com',
    content: 'Check out my website! Best deals ever! Click here now!',
    postTitle: 'SEO Optimizasyonu Rehberi',
    postSlug: 'seo-optimization-guide',
    status: 'pending',
    isSpam: true,
    createdAt: '2024-01-13T20:15:00Z',
    updatedAt: '2024-01-13T20:15:00Z',
  },
  {
    id: '5',
    author: 'Fatma Özkan',
    email: 'fatma@example.com',
    content: 'TypeScript öğrenmek için harika bir kaynak. Teşekkürler!',
    postTitle: 'TypeScript Gelişmiş Desenler',
    postSlug: 'typescript-advanced-patterns',
    status: 'rejected',
    isSpam: false,
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
];

export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'pending':
        return 'Bekliyor';
      case 'rejected':
        return 'Reddedildi';
      default:
        return status;
    }
  };

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (commentId: string, newStatus: string) => {
    console.log(`Comment ${commentId} status changed to ${newStatus}`);
    // Gerçek uygulamada API çağrısı yapılacak
  };

  const handleDeleteComment = (commentId: string) => {
    console.log(`Comment ${commentId} deleted`);
    // Gerçek uygulamada API çağrısı yapılacak
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Yorumlar</h1>
          <p className="text-muted-foreground mt-2">
            Blog yorumlarını moderatör olarak yönetin.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {comments.filter(c => c.status === 'pending').length} Bekliyor
          </Badge>
          <Badge variant="destructive">
            {comments.filter(c => c.isSpam).length} Spam
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Arama</label>
              <Input
                placeholder="Yazar, içerik veya yazı ara..."
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
                  <SelectItem value="pending">Bekliyor</SelectItem>
                  <SelectItem value="approved">Onaylandı</SelectItem>
                  <SelectItem value="rejected">Reddedildi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="w-full"
              >
                Filtreleri Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <Card key={comment.id} className={comment.isSpam ? 'border-red-200 bg-red-50/50' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{comment.author}</h3>
                    <Badge variant={getStatusBadgeVariant(comment.status)}>
                      {getStatusText(comment.status)}
                    </Badge>
                    {comment.isSpam && (
                      <Badge variant="destructive">Spam</Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium">Yazı:</span> {comment.postTitle}
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">E-posta:</span> {comment.email}
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg mb-3">
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <span>Oluşturulma: {formatDate(comment.createdAt)}</span>
                    {comment.updatedAt !== comment.createdAt && (
                      <span className="ml-4">Güncelleme: {formatDate(comment.updatedAt)}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusChange(comment.id, 'approved')}
                    disabled={comment.status === 'approved'}
                  >
                    Onayla
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusChange(comment.id, 'rejected')}
                    disabled={comment.status === 'rejected'}
                  >
                    Reddet
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedComment(comment.id)}
                  >
                    Düzenle
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${comment.postSlug}`} target="_blank">
                      Yazıyı Görüntüle
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredComments.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-lg text-muted-foreground mb-2">Yorum bulunamadı</p>
              <p className="text-sm text-muted-foreground">
                Filtreleri değiştirerek tekrar deneyin.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comment Edit Modal */}
      {selectedComment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Yorumu Düzenle</CardTitle>
              <CardDescription>
                Yorum içeriğini düzenleyebilir ve durumunu değiştirebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Yorum İçeriği</label>
                <Textarea
                  defaultValue={comments.find(c => c.id === selectedComment)?.content || ''}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedComment(null)}>
                  İptal
                </Button>
                <Button onClick={() => setSelectedComment(null)}>
                  Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Yorum İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {comments.length}
              </div>
              <div className="text-sm text-muted-foreground">Toplam Yorum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {comments.filter(c => c.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Onaylanan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {comments.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Bekleyen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {comments.filter(c => c.isSpam).length}
              </div>
              <div className="text-sm text-muted-foreground">Spam</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
