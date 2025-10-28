import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data - gerçek uygulamada API'den gelecek
const mockTags = [
  {
    id: '1',
    slug: 'nextjs',
    name: 'Next.js',
    color: '#000000',
    postCount: 8,
    description: 'React tabanlı full-stack web framework\'ü',
    featuredPosts: [
      {
        id: '1',
        slug: 'nextjs-15-modern-web-development',
        title: 'Next.js 15 ile Modern Web Geliştirme',
        excerpt: 'Next.js 15\'in yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin.',
        publishedAt: '2024-01-15T10:00:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '2',
    slug: 'react',
    name: 'React',
    color: '#61dafb',
    postCount: 12,
    description: 'Kullanıcı arayüzü geliştirme için JavaScript kütüphanesi',
    featuredPosts: [
      {
        id: '2',
        slug: 'react-hooks-best-practices',
        title: 'React Hooks En İyi Uygulamaları',
        excerpt: 'React Hooks ile modern ve temiz kod yazma teknikleri.',
        publishedAt: '2024-01-10T09:15:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '3',
    slug: 'typescript',
    name: 'TypeScript',
    color: '#3178c6',
    postCount: 15,
    description: 'JavaScript\'e tip güvenliği ekleyen programlama dili',
    featuredPosts: [
      {
        id: '3',
        slug: 'typescript-advanced-patterns',
        title: 'TypeScript Gelişmiş Desenler',
        excerpt: 'TypeScript ile daha güvenli ve ölçeklenebilir kod yazma teknikleri.',
        publishedAt: '2024-01-05T11:20:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '4',
    slug: 'tailwind-css',
    name: 'Tailwind CSS',
    color: '#06b6d4',
    postCount: 6,
    description: 'Utility-first CSS framework',
    featuredPosts: [
      {
        id: '4',
        slug: 'tailwind-css-best-practices',
        title: 'Tailwind CSS En İyi Uygulamaları',
        excerpt: 'Tailwind CSS ile daha verimli ve sürdürülebilir CSS yazma teknikleri.',
        publishedAt: '2024-01-08T16:45:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '5',
    slug: 'nodejs',
    name: 'Node.js',
    color: '#339933',
    postCount: 10,
    description: 'JavaScript runtime environment',
    featuredPosts: [
      {
        id: '5',
        slug: 'nodejs-backend-development',
        title: 'Node.js ile Backend Geliştirme',
        excerpt: 'Node.js kullanarak ölçeklenebilir ve güvenli backend uygulamaları geliştirme teknikleri.',
        publishedAt: '2024-01-20T14:30:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '6',
    slug: 'seo',
    name: 'SEO',
    color: '#8b5cf6',
    postCount: 7,
    description: 'Arama motoru optimizasyonu',
    featuredPosts: [
      {
        id: '6',
        slug: 'seo-optimization-guide',
        title: 'SEO Optimizasyonu Rehberi',
        excerpt: 'Blog yazılarınızı arama motorlarında üst sıralara çıkarmanın yolları.',
        publishedAt: '2024-01-10T09:15:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '7',
    slug: 'ui-ux',
    name: 'UI/UX',
    color: '#ec4899',
    postCount: 9,
    description: 'Kullanıcı arayüzü ve deneyim tasarımı',
    featuredPosts: [
      {
        id: '7',
        slug: 'mobile-first-design-principles',
        title: 'Mobile-First Tasarım Prensipleri',
        excerpt: 'Mobil öncelikli tasarım yaklaşımı ile kullanıcı deneyimini nasıl iyileştirirsiniz?',
        publishedAt: '2024-01-12T14:30:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  },
  {
    id: '8',
    slug: 'performance',
    name: 'Performance',
    color: '#f59e0b',
    postCount: 5,
    description: 'Web performans optimizasyonu',
    featuredPosts: [
      {
        id: '8',
        slug: 'performance-optimization-tips',
        title: 'Web Performans Optimizasyonu İpuçları',
        excerpt: 'Web sitenizin hızını artırmanın yolları. Bundle optimization ve caching.',
        publishedAt: '2024-01-03T13:10:00Z',
        author: { name: 'Erhan Yığiter' }
      }
    ]
  }
];

const TagCard: React.FC<{ tag: typeof mockTags[0] }> = ({ tag }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/tags/${tag.slug}`} className="group">
      <Card className="blog-card h-full overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                #{tag.name}
              </CardTitle>
              <Badge 
                variant="secondary" 
                className="mt-1"
                style={{ backgroundColor: tag.color + '20', color: tag.color }}
              >
                {tag.postCount} yazı
              </Badge>
            </div>
          </div>
          <CardDescription className="text-sm">
            {tag.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Öne Çıkan Yazı</h4>
            {tag.featuredPosts.map((post) => (
              <div key={post.id} className="border-l-2 pl-3" style={{ borderColor: tag.color + '40' }}>
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

export default function TagListPage() {
  // Sort tags by post count (most popular first)
  const sortedTags = [...mockTags].sort((a, b) => b.postCount - a.postCount);
  const popularTags = sortedTags.slice(0, 6);
  const otherTags = sortedTags.slice(6);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Etiketler
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Blog yazılarımızı konularına göre keşfedin. Her etiket belirli bir teknoloji veya konuya odaklanır.
        </p>
      </div>

      {/* Popular Tags */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Popüler Etiketler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {popularTags.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </div>
      </section>

      {/* All Tags */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Tüm Etiketler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {otherTags.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Etiket İstatistikleri
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {mockTags.reduce((sum, tag) => sum + tag.postCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Toplam Yazı</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {mockTags.length}
            </div>
            <div className="text-sm text-muted-foreground">Etiket</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.round(mockTags.reduce((sum, tag) => sum + tag.postCount, 0) / mockTags.length)}
            </div>
            <div className="text-sm text-muted-foreground">Ortalama</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.max(...mockTags.map(tag => tag.postCount))}
            </div>
            <div className="text-sm text-muted-foreground">En Popüler</div>
          </div>
        </div>
      </div>
    </div>
  );
}
