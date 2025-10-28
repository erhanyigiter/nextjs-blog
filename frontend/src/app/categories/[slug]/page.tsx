import CategoryDetailPage from "@/components/pages/CategoryDetailPage";

export default function CategoryDetail({ params }: { params: { slug: string } }) {
  return <CategoryDetailPage slug={params.slug} />;
}
