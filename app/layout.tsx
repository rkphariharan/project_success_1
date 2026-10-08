import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Car, Plus, Home, FileText, User } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'In-House CRM - Car Service Management',
  description: 'Professional car service management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Mobile-First Navigation */}
          <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 md:h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <Car className="w-7 h-7 md:w-8 md:h-8 text-purple-400" />
                  <span className="text-xl md:text-xl font-bold text-white">
                    <span className="hidden sm:inline">In-House CRM</span>
                    <span className="sm:hidden">CRM</span>
                  </span>
                </Link>
                {/* Desktop Nav Links */}
                <div className="hidden md:flex space-x-4">
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/add-car"
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Car</span>
                  </Link>
                </div>
                {/* Mobile: User Icon */}
                <div className="md:hidden">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </main>

          {/* Bottom Navigation - Mobile Only */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-purple-500/20 z-50 safe-bottom">
            <div className="grid grid-cols-3 h-16">
              <Link
                href="/"
                className="flex flex-col items-center justify-center space-y-1 text-purple-400 active:bg-slate-800/50"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Home</span>
              </Link>
              <Link
                href="/add-car"
                className="flex flex-col items-center justify-center space-y-1 text-gray-400 active:bg-slate-800/50"
              >
                <Plus className="w-6 h-6" />
                <span className="text-xs font-medium">Add Car</span>
              </Link>
              <Link
                href="/"
                className="flex flex-col items-center justify-center space-y-1 text-gray-400 active:bg-slate-800/50"
              >
                <FileText className="w-6 h-6" />
                <span className="text-xs font-medium">Reports</span>
              </Link>
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
