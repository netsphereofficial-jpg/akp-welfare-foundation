'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaDonate, FaUsers, FaProjectDiagram, FaImage, FaSignOutAlt, FaEdit } from 'react-icons/fa';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: FaHome },
  { href: '/admin/donations', label: 'Donations', icon: FaDonate },
  { href: '/admin/donors', label: 'Donors', icon: FaUsers },
  { href: '/admin/programs', label: 'Programs', icon: FaProjectDiagram },
  { href: '/admin/gallery', label: 'Gallery', icon: FaImage },
  { href: '/admin/editor', label: 'Content Editor', icon: FaEdit },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">AKP Welfare</h2>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
        >
          <FaSignOutAlt size={16} />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
