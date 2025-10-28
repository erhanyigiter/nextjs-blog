import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import AdminPostsPage from '@/components/admin/AdminPostsPage';

export default function AdminPosts() {
  return (
    <AdminGuard>
      <AdminLayout>
        <AdminPostsPage />
      </AdminLayout>
    </AdminGuard>
  );
}
