"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Erhan',
    lastName: 'Yığiter',
    username: 'erhanyigiter',
    email: 'erhan@example.com',
    bio: 'Full-stack geliştirici ve teknoloji meraklısı. Web teknolojileri üzerine yazmayı seviyor.',
    website: 'https://erhanyigiter.com',
    location: 'İstanbul, Türkiye',
    twitter: 'erhanyigiter',
    linkedin: 'erhanyigiter',
    github: 'erhanyigiter'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock user data
  const userStats = {
    postsCount: 12,
    commentsCount: 45,
    likesReceived: 128,
    joinDate: '2024-01-15'
  };

  const recentPosts = [
    {
      id: '1',
      title: 'Next.js 15 ile Modern Web Geliştirme',
      slug: 'nextjs-15-modern-web-development',
      publishedAt: '2024-01-15T10:00:00Z',
      viewCount: 1250,
      likeCount: 45
    },
    {
      id: '2',
      title: 'Mobile-First Tasarım Prensipleri',
      slug: 'mobile-first-design-principles',
      publishedAt: '2024-01-12T14:30:00Z',
      viewCount: 890,
      likeCount: 32
    },
    {
      id: '3',
      title: 'SEO Optimizasyonu Rehberi',
      slug: 'seo-optimization-guide',
      publishedAt: '2024-01-10T09:15:00Z',
      viewCount: 2100,
      likeCount: 78
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad gereklidir';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad gereklidir';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı gereklidir';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Mevcut şifre gereklidir';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Yeni şifre gereklidir';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Yeni şifre en az 6 karakter olmalıdır';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }

    try {
      // TODO: API call to update profile
      console.log('Profile update data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      alert('Profil başarıyla güncellendi!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    try {
      // TODO: API call to change password
      console.log('Password change data:', passwordData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Şifre başarıyla değiştirildi!');
    } catch (error) {
      console.error('Password change error:', error);
      alert('Şifre değiştirilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container-mobile md:container-tablet lg:container-desktop py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Profil Ayarları
        </h1>
        <p className="text-lg text-muted-foreground">
          Hesap bilgilerinizi yönetin ve profil ayarlarınızı güncelleyin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="blog-card">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="text-2xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {formData.firstName} {formData.lastName}
              </CardTitle>
              <CardDescription>@{formData.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{formData.bio}</p>
                <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                  {formData.website && (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      Website
                    </a>
                  )}
                  {formData.twitter && (
                    <a href={`https://twitter.com/${formData.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      Twitter
                    </a>
                  )}
                  {formData.linkedin && (
                    <a href={`https://linkedin.com/in/${formData.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      LinkedIn
                    </a>
                  )}
                  {formData.github && (
                    <a href={`https://github.com/${formData.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.postsCount}</div>
                  <div className="text-sm text-muted-foreground">Yazı</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.commentsCount}</div>
                  <div className="text-sm text-muted-foreground">Yorum</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.likesReceived}</div>
                  <div className="text-sm text-muted-foreground">Beğeni</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-primary">{formatDate(userStats.joinDate)}</div>
                  <div className="text-sm text-muted-foreground">Katılım</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card className="blog-card mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Son Yazılar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <Link href={`/blog/${post.slug}`} className="text-sm font-medium hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </Link>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>👁️ {post.viewCount}</span>
                      <span>❤️ {post.likeCount}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/blog" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Tüm yazıları görüntüle →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card className="blog-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profil Bilgileri</CardTitle>
                  <CardDescription>
                    Kişisel bilgilerinizi güncelleyin
                  </CardDescription>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="blog-button-secondary"
                >
                  {isEditing ? 'İptal' : 'Düzenle'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Ad <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Soyad <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">
                    Kullanıcı Adı <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="blog-input"
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-posta <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="blog-input"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Hakkımda</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="blog-input"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Konum</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="blog-input"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      İptal
                    </Button>
                    <Button type="submit" className="blog-button-primary">
                      Kaydet
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card className="blog-card">
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesap güvenliğiniz için şifrenizi düzenli olarak güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">
                    Mevcut Şifre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="blog-input"
                  />
                  {errors.currentPassword && (
                    <p className="text-sm text-destructive">{errors.currentPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">
                    Yeni Şifre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="blog-input"
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-destructive">{errors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Yeni Şifre Tekrar <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="blog-input"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="blog-button-primary">
                    Şifreyi Değiştir
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="blog-card border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Tehlikeli Bölge</CardTitle>
              <CardDescription>
                Bu işlemler geri alınamaz. Lütfen dikkatli olun.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-destructive">Hesabı Sil</h4>
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı ve tüm verilerinizi kalıcı olarak silin
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
                      alert('Hesap silme özelliği yakında eklenecek.');
                    }
                  }}
                >
                  Hesabı Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}