'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default function AdminLayoutInner({ children }) {
  const pathname = usePathname();
  const isEditor = pathname === '/admin/editor';

  if (isEditor) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
