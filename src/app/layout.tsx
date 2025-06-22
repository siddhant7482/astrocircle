import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { NavigationProvider } from "@/components/NavigationProvider";
import PageTransition from "@/components/PageTransition";
import { GA_TRACKING_ID } from "@/lib/gtag";

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
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </head>
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
