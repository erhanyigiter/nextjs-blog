import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Mock data - gerçek uygulamada API'den gelecek
const mockPost = {
  id: '1',
  slug: 'nextjs-15-modern-web-development',
  title: 'Next.js 15 ile Modern Web Geliştirme',
  content: `
    <h2>Next.js 15'e Hoş Geldiniz</h2>
    <p>Next.js 15, modern web geliştirme için en güçlü araçlardan biri olarak karşımıza çıkıyor. Bu yeni sürümle birlikte gelen özellikler, geliştiricilere daha hızlı ve verimli uygulamalar oluşturma imkanı sunuyor.</p>
    
    <h3>Yeni Özellikler</h3>
    <ul>
      <li><strong>App Router:</strong> Yeni routing sistemi ile daha esnek sayfa yapısı</li>
      <li><strong>Server Components:</strong> Sunucu tarafında render edilen component'ler</li>
      <li><strong>Turbo:</strong> Gelişmiş build performansı</li>
      <li><strong>TypeScript:</strong> Gelişmiş tip desteği</li>
    </ul>
    
    <h3>Performans İyileştirmeleri</h3>
    <p>Next.js 15 ile birlikte gelen performans iyileştirmeleri, uygulamalarınızın daha hızlı yüklenmesini ve daha iyi kullanıcı deneyimi sunmasını sağlıyor.</p>
    
    <blockquote>
      <p>"Next.js 15, modern web geliştirmenin geleceğini şekillendiriyor."</p>
    </blockquote>
    
    <h3>Sonuç</h3>
    <p>Next.js 15 ile modern web uygulamaları geliştirmek hiç bu kadar kolay olmamıştı. Yeni özellikler ve performans iyileştirmeleri ile birlikte, geliştiriciler daha verimli çalışabilir ve kullanıcılar daha iyi deneyimler yaşayabilir.</p>
  `,
  excerpt: 'Next.js 15\'in yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin. App Router, Server Components ve daha fazlası.',
  featuredImage: '/placeholder-blog-1.jpg',
  publishedAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  viewCount: 1250,
  likeCount: 45,
  commentCount: 12,
  author: {
    id: '1',
    username: 'erhanyigiter',
    firstName: 'Erhan',
    lastName: 'Yığiter',
    avatar: '/placeholder-avatar.jpg',
    bio: 'Full-stack developer ve teknoloji tutkunu. Modern web teknolojileri ile ilgili yazılar yazıyor.'
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
  ],
  metaTitle: 'Next.js 15 ile Modern Web Geliştirme - NextBlog',
  metaDescription: 'Next.js 15\'in yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin. App Router, Server Components ve daha fazlası.'
};

const mockComments = [
  {
    id: '1',
    content: 'Harika bir yazı! Next.js 15\'in yeni özelliklerini çok güzel açıklamışsınız.',
    createdAt: '2024-01-15T12:00:00Z',
    author: {
      id: '2',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      avatar: '/placeholder-avatar-2.jpg'
    },
    replies: [
      {
        id: '2',
        content: 'Teşekkürler! Umarım faydalı olmuştur.',
        createdAt: '2024-01-15T12:30:00Z',
        author: {
          id: '1',
          username: 'erhanyigiter',
          firstName: 'Erhan',
          lastName: 'Yığiter',
          avatar: '/placeholder-avatar.jpg'
        }
      }
    ]
  },
  {
    id: '3',
    content: 'Server Components konusunda daha detaylı bilgi verebilir misiniz?',
    createdAt: '2024-01-15T14:00:00Z',
    author: {
      id: '3',
      username: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      avatar: '/placeholder-avatar-3.jpg'
    },
    replies: []
  }
];

const mockRelatedPosts = [
  {
    id: '2',
    slug: 'mobile-first-design-principles',
    title: 'Mobile-First Tasarım Prensipleri',
    excerpt: 'Mobil öncelikli tasarım yaklaşımı ile kullanıcı deneyimini nasıl iyileştirirsiniz?',
    featuredImage: '/placeholder-blog-2.jpg',
    publishedAt: '2024-01-12T14:30:00Z',
    viewCount: 890,
    likeCount: 32,
    commentCount: 8,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: '/placeholder-avatar.jpg'
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
    id: '4',
    slug: 'tailwind-css-best-practices',
    title: 'Tailwind CSS En İyi Uygulamaları',
    excerpt: 'Tailwind CSS ile daha verimli ve sürdürülebilir CSS yazma teknikleri.',
    featuredImage: '/placeholder-blog-4.jpg',
    publishedAt: '2024-01-08T16:45:00Z',
    viewCount: 1560,
    likeCount: 56,
    commentCount: 18,
    author: {
      id: '1',
      username: 'erhanyigiter',
      firstName: 'Erhan',
      lastName: 'Yığiter',
      avatar: '/placeholder-avatar.jpg'
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
  }
];

export default function BlogDetailPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="container-mobile md:container-tablet lg:container-desktop py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-foreground">{mockPost.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Article Header */}
          <article className="mb-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge 
                  variant="secondary" 
                  style={{ backgroundColor: mockPost.category.color + '20', color: mockPost.category.color }}
                >
                  {mockPost.category.name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDate(mockPost.publishedAt)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {mockPost.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {mockPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockPost.author.avatar} />
                    <AvatarFallback>
                      {mockPost.author.firstName?.[0]}{mockPost.author.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{mockPost.author.firstName} {mockPost.author.lastName}</p>
                    <p className="text-sm text-muted-foreground">{mockPost.author.bio}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    👁️ {formatViewCount(mockPost.viewCount)}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {mockPost.likeCount}
                  </span>
                  <span className="flex items-center gap-1">
                    💬 {mockPost.commentCount}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
              {mockPost.featuredImage ? (
                <Image
                  src={mockPost.featuredImage}
                  alt={mockPost.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              )}
            </div>
            
            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: mockPost.content }}
            />
            
            {/* Tags */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {mockPost.tags.map((tag) => (
                  <Link key={tag.id} href={`/tags/${tag.slug}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </article>
          
          {/* Comments Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Yorumlar ({mockComments.length})
            </h2>
            
            {/* Comment Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Yorum Yap</CardTitle>
                <CardDescription>
                  Düşüncelerinizi paylaşın ve tartışmaya katılın.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Yorumunuzu yazın..."
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button className="blog-button-primary">
                      Yorum Gönder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments List */}
            <div className="space-y-6">
              {mockComments.map((comment) => (
                <Card key={comment.id} className="blog-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>
                          {comment.author.firstName?.[0]}{comment.author.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-semibold">{comment.author.firstName} {comment.author.lastName}</p>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-foreground mb-3">{comment.content}</p>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          Yanıtla
                        </Button>
                        
                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 ml-8 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={reply.author.avatar} />
                                  <AvatarFallback>
                                    {reply.author.firstName?.[0]}{reply.author.lastName?.[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <p className="font-medium text-sm">{reply.author.firstName} {reply.author.lastName}</p>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(reply.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-foreground">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Author Card */}
            <Card className="blog-card">
              <CardContent className="p-6 text-center">
                <Avatar className="h-16 w-16 mx-auto mb-4">
                  <AvatarImage src={mockPost.author.avatar} />
                  <AvatarFallback>
                    {mockPost.author.firstName?.[0]}{mockPost.author.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-2">{mockPost.author.firstName} {mockPost.author.lastName}</h3>
                <p className="text-sm text-muted-foreground mb-4">{mockPost.author.bio}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Profili Görüntüle
                </Button>
              </CardContent>
            </Card>
            
            {/* Related Posts */}
            <Card className="blog-card">
              <CardHeader>
                <CardTitle className="text-lg">İlgili Yazılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRelatedPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-lg">📝</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            👁️ {formatViewCount(post.viewCount)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ❤️ {post.likeCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            
            {/* Newsletter */}
            <Card className="blog-card bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Bültenimize Abone Olun</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  En son yazıları kaçırmayın
                </p>
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="E-posta adresiniz"
                    className="blog-input"
                  />
                  <Button className="blog-button-primary w-full">
                    Abone Ol
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
