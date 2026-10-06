import Link from 'next/link';
import { WifiOff, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline - Email Automator',
};

export default function OfflinePage() {
  return (
    <div className="card text-center animate-fade-in" style={{ padding: '64px 24px', maxWidth: '480px', margin: '48px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div className="icon" style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--error-bg)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <WifiOff size={32} />
        </div>
      </div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>You are offline</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Email Automator requires an active internet connection to connect to Google and dispatch emails.
      </p>
      <Link href="/" className="btn btn-accent btn-block" style={{ display: 'inline-flex', width: 'auto' }}>
        <ArrowLeft size={16} /> Try Again
      </Link>
    </div>
  );
}
