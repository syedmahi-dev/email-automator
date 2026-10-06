import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, ServerOff, Database, EyeOff, FileText, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Email Automator',
  description: 'Specific privacy policy, zero data retention guarantee, and Google API Services User Data Policy compliance disclosure for Email Automator.',
};

export default function PrivacyPolicy() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Top Navigation */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <Link href="/" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Application
        </Link>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Effective Date: October 6, 2026
        </span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'var(--success-bg)', color: 'var(--success)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '16px' }}>
          <ShieldCheck size={14} /> Privacy & Data Protection
        </div>
        <h1 style={{ fontSize: '2.25rem', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          This Privacy Policy details how Email Automator (operated at <a href="https://emailauto.syedmahi.me" style={{ color: 'var(--accent)', fontWeight: 500 }}>emailauto.syedmahi.me</a>) collects, handles, processes, and protects your information and recipient data.
        </p>
      </div>

      {/* Architectural Guarantee Box */}
      <div className="card" style={{ marginBottom: '36px', borderLeft: '4px solid var(--success)', background: 'var(--success-bg)' }}>
        <h2 style={{ fontSize: '1.0625rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
          <ServerOff size={18} /> Zero Data Retention Guarantee
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.6 }}>
          Email Automator operates with zero persistent backend databases. We do not store, log, sell, monetize, or retain your recipient records, email contents, CSV spreadsheets, business variables, or attached files. All data processing occurs ephemerally in volatile memory and is destroyed when processing finishes or when you close your browser tab.
        </p>
        <div className="grid grid-cols-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--success-border)' }}>
            <strong style={{ fontSize: '0.8125rem', color: 'var(--text)', display: 'block', marginBottom: '4px' }}>No Database</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>No SQL, MongoDB, or Firebase databases exist to store your data.</span>
          </div>
          <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--success-border)' }}>
            <strong style={{ fontSize: '0.8125rem', color: 'var(--text)', display: 'block', marginBottom: '4px' }}>In-Memory Client</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CSV parsing and templating run entirely in your web browser.</span>
          </div>
          <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--success-border)' }}>
            <strong style={{ fontSize: '0.8125rem', color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Send-Only Scope</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>We cannot read your inbox or view incoming mail.</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>1. Information We Do NOT Collect</h2>
          <p style={{ marginBottom: '12px' }}>
            Unlike traditional bulk email platforms and marketing SaaS systems, Email Automator is deliberately engineered without data storage infrastructure. We do NOT collect, archive, or retain:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li><strong>Recipient Personal Data:</strong> Names, email addresses, phone numbers, unique client identifiers, or custom business attributes uploaded in your CSV files.</li>
            <li><strong>Confidential Business & Personal Records:</strong> Financial statements, billing summaries, employee records, invoices, account balances, or proprietary operational metrics.</li>
            <li><strong>Message Contents:</strong> Email subject lines, compiled Handlebars template bodies, or personalized HTML copy.</li>
            <li><strong>File Attachments:</strong> Invoices, receipts, individual statements, certificates, documents, or images mapped to recipients.</li>
            <li><strong>Inbox Contents:</strong> Received emails, draft messages, email labels, conversation threads, or mailbox contacts.</li>
            <li><strong>Tracking Analytics:</strong> Tracking pixels, link-click redirects, cross-site telemetry, or user behavior tracking.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>2. Information Processed Ephemerally</h2>
          <p style={{ marginBottom: '12px' }}>
            To execute your requested actions, the application processes specific transient tokens and payloads during active execution only:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <li>
              <strong>Google Account Profile:</strong> When signing in with Google OAuth 2.0, NextAuth obtains your basic OpenID profile (display name, email address, profile image URL). This data is stored strictly in an encrypted, HTTP-only session cookie in your local browser to authenticate your active session. It is never persisted on an external server database.
            </li>
            <li>
              <strong>Google OAuth Access Token:</strong> An ephemeral OAuth 2.0 bearer access token issued by Google is held within your local encrypted session. This token is transmitted only when making authorized API calls directly to Google official endpoints.
            </li>
            <li>
              <strong>Transient Dispatch Envelopes:</strong> When you press &quot;Send All&quot;, your browser issues sequential HTTPS POST requests to the serverless <code>/api/send-email</code> route. The serverless function constructs an RFC 2045 MIME envelope and submits it to Google Gmail API (<code>https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send</code>). The function immediately frees all memory upon response. No logs containing recipient data are written.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="card" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--accent)' }} /> 3. Google API Services User Data Policy (Limited Use Disclosure)
          </h2>
          <p style={{ marginBottom: '12px', fontWeight: 500, color: 'var(--text)' }}>
            Email Automator&apos;s use and transfer to any other app of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Google API Services User Data Policy</a>, including the Limited Use requirements.
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
            <li>
              <strong>Specific Use Only:</strong> Google user data accessed through Google APIs is utilized exclusively to provide and improve user-facing features—specifically, dispatching emails through your authenticated Gmail account at your direct instruction.
            </li>
            <li>
              <strong>No Transfer to Third Parties:</strong> We do not transfer, distribute, or sell Google user data to third parties, advertising platforms, data brokers, or information resellers. Transmissions occur exclusively to Google&apos;s own API servers.
            </li>
            <li>
              <strong>No Advertising:</strong> Google user data is never used to serve advertisements, personalize advertising campaigns, or retarget users.
            </li>
            <li>
              <strong>No AI / Model Training:</strong> Google user data is not used to train, evaluate, or fine-tune machine learning, deep learning, or artificial intelligence models.
            </li>
            <li>
              <strong>No Human Review:</strong> No human employees, contractors, or administrators have access to read, review, or inspect your Google user data, email contents, or recipient rosters.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>4. Google OAuth 2.0 Scopes Explained</h2>
          <p style={{ marginBottom: '12px' }}>
            Email Automator adheres strictly to the principle of least privilege, requesting only the minimum scope required to fulfill its function:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}><code>https://www.googleapis.com/auth/gmail.send</code> (Restricted Scope)</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Allows the application to submit draft messages and send emails on your behalf. We cannot see received messages, read mailbox contents, or delete emails.
              </span>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'block' }}><code>openid</code>, <code>email</code>, <code>profile</code> (Identity Scopes)</strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Allows NextAuth to authenticate your Google identity, show your profile picture, and verify your authorized email address in the user interface.
              </span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>5. Third-Party Subprocessors and Infrastructure</h2>
          <p style={{ marginBottom: '12px' }}>
            Email Automator relies on the following infrastructure providers to host and deliver the web service:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li><strong>Vercel Inc.:</strong> Application edge routing and serverless function execution. Request payloads are routed over encrypted HTTPS channels and are not stored in persistent databases.</li>
            <li><strong>Google LLC:</strong> Identity provider (Google OAuth 2.0) and mail dispatch infrastructure (Gmail REST API).</li>
          </ul>
          <p>
            We do not utilize any advertising networks, third-party analytics trackers (such as Google Analytics or Meta Pixel), or marketing cookies.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>6. Commercial and Personal Data Protection (GDPR & CCPA)</h2>
          <p style={{ marginBottom: '12px' }}>
            Email Automator is engineered for enterprises, businesses, startups, non-profits, and professionals who handle sensitive recipient, customer, vendor, and member information.
          </p>
          <p>
            Under the European Union <strong>General Data Protection Regulation (GDPR)</strong>, California Consumer Privacy Act (CCPA), and international privacy frameworks, custodians of personal data must uphold strict controls. Because Email Automator processes datasets exclusively in client volatile memory without persistent backend storage, recipient records never enter a permanent database. Operators maintain complete data sovereignty at all times.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>7. User Control, Data Deletion, and Revocation</h2>
          <p style={{ marginBottom: '12px' }}>
            Because Email Automator retains zero persistent records, data deletion occurs automatically when you complete your batch or close your browser session.
          </p>
          <p style={{ marginBottom: '12px' }}>
            You maintain full sovereignty over your Google Account credentials. You can revoke access at any time:
          </p>
          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li>Navigate to <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Google Account Permissions</a>.</li>
            <li>Locate &quot;Email Automator&quot; in the list of third-party apps with account access.</li>
            <li>Click <strong>Remove Access</strong>.</li>
          </ol>
          <p>
            Once revoked, the application is technically incapable of sending emails through your Google account.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>8. Security Safeguards</h2>
          <p style={{ marginBottom: '12px' }}>
            We implement strict security practices to safeguard data in flight:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Mandatory TLS 1.3 cryptographic transport security for all data transferred between client browsers, serverless compute functions, and Google APIs.</li>
            <li>Encrypted, HTTP-only, SameSite session cookies for authentication tokens, preventing access from malicious client-side JavaScript.</li>
            <li>Strict Content Security Policies and zero third-party script injections.</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>9. Contact and Data Controller Inquiries</h2>
          <p>
            For inquiries, privacy assessments, or questions regarding this Privacy Policy, please contact the developer:
          </p>
          <div style={{ marginTop: '8px', padding: '16px', background: 'var(--bg-input)', borderRadius: '8px', fontSize: '0.875rem' }}>
            <div><strong>Developer & Maintainer:</strong> Syed Mahi</div>
            <div><strong>Email:</strong> <a href="mailto:syedmahi@iut-dhaka.edu" style={{ color: 'var(--accent)', fontWeight: 500 }}>syedmahi@iut-dhaka.edu</a></div>
            <div><strong>Website:</strong> <a href="https://syedmahi.me" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 500 }}>syedmahi.me</a></div>
            <div><strong>Project Repository:</strong> <a href="https://github.com/syedmahi-dev/email-automator" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 500 }}>github.com/syedmahi-dev/email-automator</a></div>
          </div>
        </section>

      </div>

      {/* Footer link to Terms of Service */}
      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link href="/terms" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
          <FileText size={15} /> Read Terms of Service
        </Link>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Email Automator 2026. All rights reserved.
        </span>
      </div>

    </div>
  );
}
