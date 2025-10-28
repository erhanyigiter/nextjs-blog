import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </AdminGuard>
  );
}
