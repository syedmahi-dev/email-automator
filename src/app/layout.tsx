import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Email Automator - Schema-Agnostic Bulk Email Platform",
  description: "Merge arbitrary spreadsheets, template personalized emails, auto-match PDF attachments, and send directly through Google.",
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
    <html lang="en">
      <body>
        <Providers>
          <main className="container animate-fade-in">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
