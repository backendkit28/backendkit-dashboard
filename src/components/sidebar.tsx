'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tenants', href: '/tenants', icon: Building2 },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-r border-gray-800/50 shadow-2xl">
      {/* Header con gradiente y efecto brillante */}
      <div className="flex h-16 items-center px-6 border-b border-gray-800/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            BackendKit
          </h1>
        </div>
      </div>
      
      {/* Navigation con efectos hover mejorados */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white hover:scale-[1.02] hover:shadow-md'
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                isActive && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              )} />
              <span className={cn(
                "transition-all duration-200",
                isActive && "font-semibold"
              )}>
                {item.name}
              </span>
              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-white shadow-lg shadow-white/50 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer con mejor diseño */}
      <div className="border-t border-gray-800/50 p-4 bg-gray-900/50">
        <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 hover:scale-[1.02]">
          <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
