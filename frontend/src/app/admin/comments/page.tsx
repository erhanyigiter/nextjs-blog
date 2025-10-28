import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import AdminCommentsPage from '@/components/admin/AdminCommentsPage';

export default function AdminComments() {
  return (
    <AdminGuard>
      <AdminLayout>
        <AdminCommentsPage />
      </AdminLayout>
    </AdminGuard>
  );
}
