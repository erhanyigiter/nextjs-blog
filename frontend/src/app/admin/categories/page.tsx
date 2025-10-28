import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import AdminCategoriesPage from '@/components/admin/AdminCategoriesPage';

export default function AdminCategories() {
  return (
    <AdminGuard>
      <AdminLayout>
        <AdminCategoriesPage />
      </AdminLayout>
    </AdminGuard>
  );
}
