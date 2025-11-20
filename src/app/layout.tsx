import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BackendKit Dashboard',
  description: 'Admin dashboard for BackendKit - Manage your SaaS backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-gray-50">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main content area */}
          <div className="flex-1 overflow-y-auto">
            {/* Top bar con sombra sutil */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
              <div className="flex h-16 items-center justify-end px-8">
                {/* Aquí puedes agregar notificaciones, perfil de usuario, etc. */}
                <div className="flex items-center gap-4">
                  <button className="relative rounded-full p-2 hover:bg-gray-100 transition-colors">
                    <span className="sr-only">Notifications</span>
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200" />
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      A
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@backendkit.dev</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content con padding y max-width */}
            <main className="p-8 max-w-[1600px] mx-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
