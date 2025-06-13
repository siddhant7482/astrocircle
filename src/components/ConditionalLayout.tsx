"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuth } from "@/lib/AuthContext";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  // Don't show sidebar layout on auth pages or if not authenticated
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.startsWith('/register') || pathname === '/';
  const showSidebar = !isLoading && isAuthenticated && !isAuthPage;

  if (!showSidebar) {
    return <main className="h-full">{children}</main>;
  }

  return (
    <div className="h-full relative">
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 shadow-sm sm:px-6 md:hidden">
          <Sidebar />
          <div className="flex-1">
            <h1 className="text-xl font-semibold">AstroCircle</h1>
          </div>
        </div>
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
} 