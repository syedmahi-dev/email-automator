import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Email Automator - Bulk & Manual Sender",
  description: "Automate sending personalized emails, announcements, or grades",
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
