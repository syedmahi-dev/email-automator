import Link from 'next/link';
import { ArrowLeft, Scale, FileText, CheckCircle2, Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Email Automator',
  description: 'Detailed terms of service, acceptable use policies, and legal specifications for Email Automator.',
};

export default function TermsOfService() {
  return (
    <div className="legal-page animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Top Navigation */}
      <div className="legal-nav" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Application
        </Link>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Effective Date: October 6, 2026
        </span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '16px' }}>
          <Scale size={14} /> Legal Agreement
        </div>
        <h1 style={{ fontSize: '2.25rem', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          These Terms of Service govern your access to and utilization of Email Automator (accessible at <a href="https://emailauto.syedmahi.me" style={{ color: 'var(--accent)', fontWeight: 500 }}>emailauto.syedmahi.me</a>). By accessing this service or connecting your Google account, you enter into a legally binding agreement with the operator.
        </p>
      </div>

      {/* Summary Box */}
      <div className="card" style={{ marginBottom: '36px', background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
        <h2 style={{ fontSize: '1.0625rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: 'var(--accent)' }} /> Key Principles at a Glance
        </h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <span><strong>Client-Orchestrated Operation:</strong> Data processing and file merging occur locally in browser memory. We maintain zero permanent database storage.</span>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <span><strong>Send-Only Scope:</strong> We strictly request the <code>gmail.send</code> OAuth scope. We cannot read, modify, or inspect your inbox.</span>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <span><strong>Zero Spam Tolerance:</strong> Phishing, malicious file delivery, automated spam, and unsolicited commercial broadcasting are strictly forbidden.</span>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
            <span><strong>Quota Accountability:</strong> Senders are solely responsible for compliance with Google account sending limits (500 or 2,000 emails per 24 hours).</span>
          </li>
        </ul>
      </div>

      {/* Main Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
        
        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>1. Scope and Nature of Service</h2>
          <p style={{ marginBottom: '12px' }}>
            Email Automator is an open, schema-agnostic email automation utility engineered by Syed Mahi. The platform provides software tools that allow authenticated operators to:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li>Parse arbitrary comma-separated value (CSV) datasets directly in local browser memory.</li>
            <li>Relational-join multiple tabular datasets using operator-selected key identifiers.</li>
            <li>Compile dynamic email templates utilizing Handlebars variable substitution syntax.</li>
            <li>Map local attachment filenames against tabular recipient keys.</li>
            <li>Submit generated RFC 2045 multi-part MIME messages directly to Google LLC official Gmail API on behalf of the authenticated user.</li>
          </ul>
          <p>
            Email Automator does not operate an independent mail server, does not provide email hosting, does not offer SMTP outbound relays, and does not maintain third-party marketing subscriber lists. All outbound communications originate exclusively from the Google user account authorized by the operator.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>2. Authentication and Google OAuth Authorization</h2>
          <p style={{ marginBottom: '12px' }}>
            To utilize email dispatch features, operators must authenticate through Google OAuth 2.0. By authenticating, you authorize Email Automator to request the following specific scopes:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li><code>https://www.googleapis.com/auth/gmail.send</code>: Required strictly to transmit generated email messages.</li>
            <li><code>openid</code>, <code>email</code>, <code>profile</code>: Required to establish your session identity and display your sender address.</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>
            The application explicitly rejects requesting broader permissions such as <code>gmail.readonly</code>, <code>gmail.modify</code>, or full mailbox access. The application has no technical capability to view received messages, read threads, modify labels, or delete contents in your mailbox.
          </p>
          <p>
            You may revoke Email Automator authorization at any moment via your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Google Account Security Permissions</a>. Upon revocation, all application capabilities requiring email dispatch are immediately terminated.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>3. Acceptable Use Policy and Strict Prohibitions</h2>
          <p style={{ marginBottom: '12px' }}>
            You represent and warrant that all email dispatches executed through Email Automator comply with all applicable local, national, and international laws, regulations, and messaging guidelines. You expressly agree that you will not use this platform to:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li>Transmit unsolicited commercial advertisements, marketing materials, or spam in violation of the United States CAN-SPAM Act of 2003, the European Union General Data Protection Regulation (GDPR), the Canadian Anti-Spam Legislation (CASL), or equivalent statutes.</li>
            <li>Execute deceptive identity phishing, password harvesting, social engineering scams, or financial fraud.</li>
            <li>Distribute computer viruses, ransomware, spyware, malicious attachments, or links to malicious domains.</li>
            <li>Harass, stalk, threaten, defame, abuse, or invade the privacy of any person, entity, or organization.</li>
            <li>Spoof, disguise, or manipulate email sender headers, originating addresses, or authentication signatures.</li>
            <li>Attempt to bypass, defeat, or manipulate rate limits, security filters, or abuse-prevention systems maintained by Google LLC.</li>
          </ul>
          <p>
            Violation of any provision in this Acceptable Use Policy constitutes immediate grounds for termination of service access and potential referral to relevant network abuse authorities.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>4. Google Account Sending Quotas and Limits</h2>
          <p style={{ marginBottom: '12px' }}>
            All transmissions made through this platform are constrained by Google LLC native email sending quotas:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li><strong>Personal Gmail Accounts (<code>@gmail.com</code>):</strong> Maximum 500 recipients per rolling 24-hour period.</li>
            <li><strong>Google Workspace Accounts:</strong> Maximum 2,000 recipients per rolling 24-hour period (subject to your organization administrator settings).</li>
          </ul>
          <p>
            Email Automator does not and cannot bypass Google account limits. If you attempt to send to more recipients than your account tier allows, Google will reject further transmissions and may temporarily place a sending hold on your account. The operator is solely responsible for monitoring and managing their transmission volume.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>5. User Data Ownership and Recipient Privacy</h2>
          <p style={{ marginBottom: '12px' }}>
            The operator retains complete, exclusive ownership of all tabular files, contact directories, operational metrics, transactional reports, subject lines, template bodies, and attached documents processed through the application. Email Automator claims no proprietary rights, copyright, or licenses over your data.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>Regulatory Compliance:</strong> The operator represents and warrants that they possess lawful authorization, necessary consents, and legitimate legal basis under applicable data protection frameworks (including GDPR, CCPA, and CAN-SPAM) to transmit messages to all designated recipient addresses. Because Email Automator does not persist, archive, or retain records on server databases, the service functions solely as a localized user-initiated transmission conduit.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>6. Disclaimer of Warranties</h2>
          <p style={{ marginBottom: '12px' }}>
            THE APPLICATION IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, THE OPERATOR AND CONTRIBUTORS DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</li>
            <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.</li>
            <li>WARRANTIES REGARDING INBOX PLACEMENT, DELIVERABILITY RATES, OR RECIPIENT SPAM CLASSIFICATION BY THIRD-PARTY MAIL PROVIDERS.</li>
            <li>WARRANTIES REGARDING DATA INTEGRITY WHEN MALFORMED OR CORRUPT CSV FILES ARE UPLOADED.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>7. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL SYED MAHI, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, BUSINESS INTERRUPTION, TEMPORARY OR PERMANENT GOOGLE ACCOUNT SUSPENSION, OR DELIVERY FAILURES) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT ARISING IN ANY WAY OUT OF THE USE OF OR INABILITY TO USE THIS APPLICATION.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>8. Open Source License and Attribution</h2>
          <p style={{ marginBottom: '12px' }}>
            The underlying source code of Email Automator is licensed under the <strong>MIT License</strong>. You may inspect, fork, self-host, or adapt the software in accordance with the terms of the MIT License located in the project repository.
          </p>
          <p>
            Self-hosted deployments are independent implementations. Syed Mahi assumes no responsibility or liability for third-party forks, self-hosted instances, or modified variants operated on third-party infrastructure.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>9. Modifications to Terms</h2>
          <p>
            The operator reserves the right to revise or update these Terms of Service at any time to reflect software changes, regulatory compliance, or updated Google API requirements. The revised version will be indicated by the &quot;Effective Date&quot; at the top of this document. Continued usage after modifications constitutes acceptance of the amended terms.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text)', marginBottom: '12px' }}>10. Contact and Inquiries</h2>
          <p>
            Questions, concerns, or legal notices regarding these Terms of Service should be directed to Syed Mahi via email at <a href="mailto:syedmahi@iut-dhaka.edu" style={{ color: 'var(--accent)', fontWeight: 500 }}>syedmahi@iut-dhaka.edu</a> or via the project GitHub repository at <a href="https://github.com/syedmahi-dev/email-automator" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 500 }}>github.com/syedmahi-dev/email-automator</a>.
          </p>
        </section>

      </div>

      {/* Footer link to Privacy Policy */}
      <div className="legal-footer" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link href="/privacy" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
          <Lock size={15} /> Read Privacy Policy
        </Link>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Email Automator 2026. All rights reserved.
        </span>
      </div>

    </div>
  );
}
