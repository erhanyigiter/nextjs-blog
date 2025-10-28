import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data - gerçek uygulamada API'den gelecek
const mockCategories = [
  {
    id: '1',
    slug: 'technology',
    name: 'Teknoloji',
    description: 'Web geliştirme, programlama ve teknoloji trendleri hakkında yazılar.',
    color: '#3b82f6',
    icon: '💻',
    postCount: 12,
    featuredPosts: [
      {
        id: '1',
        slug: 'nextjs-15-modern-web-development',
        title: 'Next.js 15 ile Modern Web Geliştirme',
        excerpt: 'Next.js 15\'in yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin.',
        publishedAt: '2024-01-15T10:00:00Z',
        author: { name: 'Erhan Yığiter' }
      },
      {
        id: '2',
        slug: 'typescript-advanced-patterns',
        title: 'TypeScript Gelişmiş Desenler',
        excerpt: 'TypeScript ile daha güvenli ve ölçeklenebilir kod yazma teknikleri.',
        publishedAt: '2024-01-05T11:20:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '2',
    slug: 'design',
    name: 'Tasarım',
    description: 'UI/UX tasarım, görsel tasarım ve kullanıcı deneyimi konularında yazılar.',
    color: '#10b981',
    icon: '🎨',
    postCount: 8,
    featuredPosts: [
      {
        id: '3',
        slug: 'mobile-first-design-principles',
        title: 'Mobile-First Tasarım Prensipleri',
        excerpt: 'Mobil öncelikli tasarım yaklaşımı ile kullanıcı deneyimini nasıl iyileştirirsiniz?',
        publishedAt: '2024-01-12T14:30:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '3',
    slug: 'seo',
    name: 'SEO',
    description: 'Arama motoru optimizasyonu, içerik stratejisi ve dijital pazarlama.',
    color: '#8b5cf6',
    icon: '📈',
    postCount: 6,
    featuredPosts: [
      {
        id: '4',
        slug: 'seo-optimization-guide',
        title: 'SEO Optimizasyonu Rehberi',
        excerpt: 'Blog yazılarınızı arama motorlarında üst sıralara çıkarmanın yolları.',
        publishedAt: '2024-01-10T09:15:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '4',
    slug: 'development',
    name: 'Geliştirme',
    description: 'Yazılım geliştirme süreçleri, araçlar ve metodolojiler.',
    color: '#f59e0b',
    icon: '🚀',
    postCount: 15,
    featuredPosts: [
      {
        id: '5',
        slug: 'tailwind-css-best-practices',
        title: 'Tailwind CSS En İyi Uygulamaları',
        excerpt: 'Tailwind CSS ile daha verimli ve sürdürülebilir CSS yazma teknikleri.',
        publishedAt: '2024-01-08T16:45:00Z',
        author: { name: 'Erhan Yığiter' }
      },
      {
        id: '6',
        slug: 'performance-optimization-tips',
        title: 'Web Performans Optimizasyonu İpuçları',
        excerpt: 'Web sitenizin hızını artırmanın yolları. Bundle optimization ve caching.',
        publishedAt: '2024-01-03T13:10:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  }
];

const CategoryCard: React.FC<{ category: typeof mockCategories[0] }> = ({ category }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <Card className="blog-card h-full overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: category.color + '20' }}
            >
              {category.icon}
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {category.name}
              </CardTitle>
              <Badge 
                variant="secondary" 
                className="mt-1"
                style={{ backgroundColor: category.color + '20', color: category.color }}
              >
                {category.postCount} yazı
              </Badge>
            </div>
          </div>
          <CardDescription className="text-base">
            {category.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Öne Çıkan Yazılar</h4>
            {category.featuredPosts.map((post) => (
              <div key={post.id} className="border-l-2 pl-3" style={{ borderColor: category.color + '40' }}>
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  <h5 className="text-sm font-medium line-clamp-1">{post.title}</h5>
                </Link>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function CategoryListPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Kategoriler
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          İlgi alanınıza göre blog yazılarımızı keşfedin. Her kategori kendi uzmanlık alanında derinlemesine içerikler sunar.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-12">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          İçerik İstatistikleri
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {mockCategories.reduce((sum, cat) => sum + cat.postCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Toplam Yazı</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {mockCategories.length}
            </div>
            <div className="text-sm text-muted-foreground">Kategori</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {mockCategories.reduce((sum, cat) => sum + cat.featuredPosts.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Öne Çıkan</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              2024
            </div>
            <div className="text-sm text-muted-foreground">Aktif Yıl</div>
          </div>
        </div>
      </div>
    </div>
  );
}
