import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { NavigationProvider } from "@/components/NavigationProvider";
import PageTransition from "@/components/PageTransition";

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
        <AuthProvider>
          <NavigationProvider>
            <ConditionalLayout>
              <PageTransition>
                {children}
              </PageTransition>
            </ConditionalLayout>
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
