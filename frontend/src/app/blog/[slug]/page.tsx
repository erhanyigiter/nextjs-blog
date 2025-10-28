import BlogDetailPage from '@/components/pages/BlogDetailPage';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogDetailPage />;
}
