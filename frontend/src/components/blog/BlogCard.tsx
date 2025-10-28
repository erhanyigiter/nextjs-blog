import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage?: string;
    publishedAt: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    author: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      avatar?: string;
    };
    category?: {
      id: string;
      slug: string;
      name: string;
      color: string;
      icon?: string;
    };
    tags: Array<{
      id: string;
      slug: string;
      name: string;
      color: string;
    }>;
  };
  variant?: 'default' | 'featured' | 'compact';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
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

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <Card className="blog-card h-full">
          <div className="flex gap-4 p-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <div className="text-xs text-muted-foreground font-medium">Blog Yazısı</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {post.category && (
                  <Badge 
                    variant="secondary" 
                    style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                  >
                    {post.category.name}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </span>
              </div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <Card className="blog-card h-full overflow-hidden">
          <div className="aspect-[16/9] bg-muted rounded-t-lg overflow-hidden">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-3">📝</div>
                  <div className="text-sm text-muted-foreground font-medium">Blog Yazısı</div>
                </div>
              </div>
            )}
          </div>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-3">
              {post.category && (
                <Badge 
                  variant="secondary" 
                  style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                >
                  {post.category.name}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <CardTitle className="text-2xl group-hover:text-primary transition-colors line-clamp-2 mb-3">
              {post.title}
            </CardTitle>
            <CardDescription className="text-base line-clamp-3">
              {post.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.firstName} {post.author.lastName}</p>
                  <p className="text-sm text-muted-foreground">Full-stack developer ve teknoloji tutkunu. Modern web teknolojileri ile ilgili yazılar yazıyor.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  👁️ {formatViewCount(post.viewCount)}
                </span>
                <span className="flex items-center gap-1">
                  ❤️ {post.likeCount}
                </span>
                <span className="flex items-center gap-1">
                  💬 {post.commentCount}
                </span>
              </div>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="blog-card h-full">
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={300}
              height={169}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-xs text-muted-foreground font-medium">Blog Yazısı</div>
              </div>
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.category && (
              <Badge 
                variant="secondary" 
                style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
              >
                {post.category.name}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>
                  {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{post.author.firstName} {post.author.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                👁️ {formatViewCount(post.viewCount)}
              </span>
              <span className="flex items-center gap-1">
                ❤️ {post.likeCount}
              </span>
            </div>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
