import Link from 'next/link';
import { 
  ShieldCheck, 
  Mail, 
  Database, 
  Zap, 
  FileSpreadsheet, 
  KeyRound, 
  FileText, 
  Lock, 
  ServerOff, 
  ExternalLink,
  Code2,
  BookOpen
} from 'lucide-react';
import GoogleSignIn from './GoogleSignIn';

export default function LandingPage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '32px' }}>
      
      {/* Hero Section */}
      <div className="text-center" style={{ padding: '32px 0 16px' }}>
        <img 
          src="/branding/email-automator-mark.svg" 
          alt="Email Automator Logo" 
          width="72" 
          height="72" 
          style={{ margin: '0 auto 20px', display: 'block', borderRadius: '18px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)' }} 
        />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', letterSpacing: '-0.04em' }}>Automate Personalized Bulk Emails</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Send personalized transactional emails, customer reports, invoices, and operational announcements to hundreds of recipients in seconds—directly from your own Gmail account with zero database retention.
        </p>
        <div style={{ maxWidth: '320px', margin: '0 auto' }}>
          <GoogleSignIn />
        </div>
      </div>

      {/* How it Works */}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={20} style={{ color: 'var(--accent)' }} /> How It Works
        </h2>
        <div className="grid grid-cols-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          
          <div className="card">
            <div style={{ background: 'var(--bg-input)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--accent)' }}>
              <Database size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>1. Connect Your Data</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Upload primary contact lists and optional secondary data tables. The system automatically detects CSV schemas and merges them based on matching key columns in local memory.
            </p>
          </div>

          <div className="card">
            <div style={{ background: 'var(--bg-input)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--accent)' }}>
              <FileSpreadsheet size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>2. Compose & Attach</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Write your email using dynamic variables like <code>{`{{Name}}`}</code> and <code>{`{{AccountBalance}}`}</code>. You can also automatically attach personalized files to specific recipients by matching filenames to IDs.
            </p>
          </div>

          <div className="card">
            <div style={{ background: 'var(--bg-input)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--accent)' }}>
              <Mail size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>3. Review & Send</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Preview exactly what each recipient will receive. Once verified, hit send and watch the real-time progress bar as emails go out reliably through Google official API.
            </p>
          </div>

        </div>
      </div>

      {/* Security & Privacy Highlights */}
      <div className="card" style={{ borderLeft: '4px solid var(--success)', background: 'var(--success-bg)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
          <ShieldCheck size={20} /> Security & Privacy First
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
          We understand that handling client, customer, and stakeholder data requires strict confidentiality. This tool is built to ensure your data never leaves your control.
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <ServerOff size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}>Zero Data Retention</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Your CSV files, email content, and attachments are processed entirely in-memory. We do not use databases, and nothing is saved on our servers. When you close the tab, the data is gone forever.</span>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <KeyRound size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}>Restricted Email Scopes</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>We only request the specific Google permission required to <em>send</em> emails on your behalf (<code>https://www.googleapis.com/auth/gmail.send</code>). We cannot read your inbox, see your received emails, or delete anything.</span>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Lock size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}>Google API Limited Use Adherence</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Email Automator adheres strictly to the Google API Services User Data Policy, including Limited Use requirements. We never transfer Google user data to third parties, never use it for advertising, and never use it to train AI models.</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Ready to Start CTA */}
      <div className="card text-center" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', padding: '36px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Ready to send personalized emails?</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 20px' }}>
          Connect your Google account and experience streamlined bulk personalization with total data control.
        </p>
        <div style={{ maxWidth: '280px', margin: '0 auto' }}>
          <GoogleSignIn />
        </div>
      </div>

      {/* Comprehensive Landing Page Bottom Footer */}
      <footer style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '36px', color: 'var(--text-secondary)' }}>
        
        {/* Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '36px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <img src="/branding/email-automator-mark.svg" alt="Email Automator Logo" width="24" height="24" style={{ borderRadius: '6px' }} />
              <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem', letterSpacing: '-0.02em' }}>Email Automator</span>
            </div>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '14px' }}>
              A client-orchestrated, schema-agnostic bulk email automation utility for businesses, teams, and independent operators. Dispatches directly through your personal or Google Workspace account with zero server data retention.
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <span style={{ whiteSpace: 'nowrap' }}>MIT Licensed</span>
              <span style={{ opacity: 0.5 }}>&bull;</span>
              <span style={{ wordBreak: 'break-word' }}>Production Domain: emailauto.syedmahi.me</span>
            </div>
          </div>

          {/* Legal & Compliance Column */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Legal & Compliance
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <li>
                <Link href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} /> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy#limited-use" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} /> Google Limited Use Disclosure
                </Link>
              </li>
              <li>
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ExternalLink size={14} /> Google User Data Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Documentation & Resources Column */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Documentation & Source
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <li>
                <a href="https://github.com/syedmahi-dev/email-automator/blob/main/docs/GOOGLE_OAUTH_SETUP.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={14} /> Google OAuth Setup Guide
                </a>
              </li>
              <li>
                <a href="https://github.com/syedmahi-dev/email-automator/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={14} /> Systems Architecture
                </a>
              </li>
              <li>
                <a href="https://github.com/syedmahi-dev/email-automator" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Code2 size={14} /> GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/syedmahi-dev/email-automator/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} /> MIT License
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div>
            Copyright 2026 Syed Mahi. Released under the MIT License.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
            <a href="https://syedmahi.me" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Developer Profile</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
