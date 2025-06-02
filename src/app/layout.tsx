import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AstroGuide - Your Personal Astrology Dashboard",
  description: "Get personalized astrological insights and predictions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="h-full relative">
          <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <div className="md:pl-72">
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 shadow-sm sm:px-6 md:hidden">
              <Sidebar />
              <div className="flex-1">
                <h1 className="text-xl font-semibold">AstroGuide</h1>
              </div>
            </div>
            <main className="h-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
