import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Modern Blog Platformu
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Next.js 15 ve Turbo ile güçlendirilmiş, hızlı ve SEO dostu blog deneyimi. 
          Çok dilli destek ve modern tasarım.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button size="lg" className="blog-button-primary">
              Blog Yazılarını Keşfet
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="blog-button-secondary">
              Hakkımızda
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Öne Çıkan Yazılar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Post Card 1 */}
          <Card className="blog-card group cursor-pointer">
            <div className="aspect-video bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Teknoloji</Badge>
                <Badge variant="outline">Next.js</Badge>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                Next.js 15 ile Modern Web Geliştirme
              </CardTitle>
              <CardDescription>
                Next.js 15'in yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>EY</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Erhan Yığiter</p>
                  <p className="text-muted-foreground">2 gün önce</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post Card 2 */}
          <Card className="blog-card group cursor-pointer">
            <div className="aspect-video bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Tasarım</Badge>
                <Badge variant="outline">UI/UX</Badge>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                Mobile-First Tasarım Prensipleri
              </CardTitle>
              <CardDescription>
                Mobil öncelikli tasarım yaklaşımı ile kullanıcı deneyimini nasıl iyileştirirsiniz?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>EY</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Erhan Yığiter</p>
                  <p className="text-muted-foreground">5 gün önce</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post Card 3 */}
          <Card className="blog-card group cursor-pointer">
            <div className="aspect-video bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">SEO</Badge>
                <Badge variant="outline">Optimizasyon</Badge>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                SEO Optimizasyonu Rehberi
              </CardTitle>
              <CardDescription>
                Blog yazılarınızı arama motorlarında üst sıralara çıkarmanın yolları.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>EY</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Erhan Yığiter</p>
                  <p className="text-muted-foreground">1 hafta önce</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Kategoriler
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="blog-card cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">Teknoloji</h3>
              <p className="text-sm text-muted-foreground">12 yazı</p>
            </CardContent>
          </Card>
          
          <Card className="blog-card cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">Tasarım</h3>
              <p className="text-sm text-muted-foreground">8 yazı</p>
            </CardContent>
          </Card>
          
          <Card className="blog-card cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">SEO</h3>
              <p className="text-sm text-muted-foreground">6 yazı</p>
            </CardContent>
          </Card>
          
          <Card className="blog-card cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">Geliştirme</h3>
              <p className="text-sm text-muted-foreground">15 yazı</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-8">
        <Card className="blog-card bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Bültenimize Abone Olun
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              En son yazılarımızı ve teknoloji haberlerini e-posta ile alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz"
                className="blog-input flex-1"
              />
              <Button className="blog-button-primary">
                Abone Ol
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
