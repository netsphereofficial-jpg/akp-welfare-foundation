import AdminLayoutInner from '@/components/admin/AdminLayoutInner';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return <AdminLayoutInner>{children}</AdminLayoutInner>;
}
