import { ShieldCheck, Mail, Database, Zap, FileSpreadsheet, KeyRound } from 'lucide-react';
import GoogleSignIn from './GoogleSignIn';

export default function LandingPage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      
      {/* Hero Section */}
      <div className="text-center" style={{ padding: '32px 0' }}>
        <img 
          src="/branding/email-automator-mark.svg" 
          alt="Email Automator Logo" 
          width="72" 
          height="72" 
          style={{ margin: '0 auto 20px', display: 'block', borderRadius: '18px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)' }} 
        />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', letterSpacing: '-0.04em' }}>Automate Personalized Bulk Emails</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Send grades, announcements, and individualized reports to hundreds of students or clients in seconds—directly from your own Gmail account.
        </p>
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
              Upload primary student records and optional additional grading sheets. The system automatically merges them based on matching ID columns.
            </p>
          </div>

          <div className="card">
            <div style={{ background: 'var(--bg-input)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--accent)' }}>
              <FileSpreadsheet size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>2. Compose & Attach</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Write your email using dynamic variables like <code>{`{{Name}}`}</code> and <code>{`{{Grade}}`}</code>. You can also automatically attach personalized files to specific recipients.
            </p>
          </div>

          <div className="card">
            <div style={{ background: 'var(--bg-input)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--accent)' }}>
              <Mail size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>3. Review & Send</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Preview exactly what each recipient will receive. Once verified, hit send and watch the progress bar as emails go out reliably through Google.
            </p>
          </div>

        </div>
      </div>

      {/* Security & Privacy */}
      <div className="card" style={{ borderLeft: '4px solid var(--success)', background: 'var(--success-bg)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
          <ShieldCheck size={20} /> Security & Privacy First
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
          We understand that handling student and client data requires strict confidentiality. This tool is built to ensure your data never leaves your control.
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <KeyRound size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}>Zero Data Retention</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Your CSV files, email content, and attachments are processed entirely in-memory. We do not use databases, and nothing is saved on our servers. When you close the tab, the data is gone forever.</span>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <KeyRound size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}>Restricted Email Scopes</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>We only request the specific Google permission required to <em>send</em> emails on your behalf (`https://www.googleapis.com/auth/gmail.send`). We cannot read your inbox, see your received emails, or delete anything.</span>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <KeyRound size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}>Secure Direct Sending</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Emails are routed directly through your own Google Workspace or Gmail account. This ensures high deliverability and ensures the emails appear in your own "Sent" folder.</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Login CTA */}
      <div style={{ marginTop: '16px' }}>
        <GoogleSignIn />
      </div>

    </div>
  );
}
