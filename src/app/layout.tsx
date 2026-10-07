import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from '@vercel/analytics/next';

const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fdfdfd',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // prevents iOS zoom
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Email Automator",
  description: "Merge arbitrary spreadsheets, template personalized emails, auto-match PDF attachments, and send directly through Google.",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Email Automator',
  },
  icons: {
    icon: [
      { url: "/branding/email-automator-mark.svg", type: "image/svg+xml" },
      { url: "/branding/email-automator-favicon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/branding/email-automator-favicon-192.png", sizes: "192x192", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <Providers>
          <main className="container animate-fade-in">
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
