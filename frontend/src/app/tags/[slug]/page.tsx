import TagDetailPage from "@/components/pages/TagDetailPage";

export default function TagDetail({ params }: { params: { slug: string } }) {
  return <TagDetailPage slug={params.slug} />;
}
