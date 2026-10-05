<div align="center">

# Email Automator

**Secure, in-memory bulk email personalization and operational dispatch platform powered by Next.js and Google Cloud.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Gmail_API_v1-4285F4?style=flat-square&logo=google-cloud)](https://cloud.google.com/)
[![Zero Data Retention](https://img.shields.io/badge/Security-Zero_Persistence-059669?style=flat-square)](docs/ARCHITECTURE.md)

</div>

---

## Executive Overview

**Email Automator** is a specialized, privacy-first email delivery platform designed for educators, academic coordinators, team leads, and business administrators. It eliminates the manual friction and reputational risk of sending individualized emails, reports, grades, and notices at scale.

Traditional bulk mail utilities either require exposing raw account passwords (SMTP anti-patterns) or uploading sensitive institutional spreadsheets into third-party marketing databases. **Email Automator** takes an entirely different architectural approach:

1. **Client-Side In-Memory Processing**: CSV parsing, dataset joining, template compilation, and attachment matching take place entirely within volatile browser memory.
2. **Direct Google OAuth Delegation**: Outgoing emails are dispatched directly through your official Google Workspace or Gmail account using a restricted, send-only scope (`https://www.googleapis.com/auth/gmail.send`).
3. **Operator Verification Safeguards**: Every recipient record, merged attribute, CC/BCC target, and matched attachment is presented in an interactive confidence grid for inline verification and editing before any email is dispatched.

---

## Key Capabilities

- **Multi-Dataset CSV Joining**: Upload two independent spreadsheets (e.g., student roster + examination score sheet). The engine heuristically identifies candidate join keys (or lets you select them explicitly) and merges them into a unified recipient dataset.
- **Dynamic Handlebars Templating**: Author emails using intuitive syntax (`Hello {{Name}}, your score in {{Course}} is {{Grade}}`). Interpolation applies dynamically across the message body, subject line, CC, and BCC fields.
- **Rich Text WYSIWYG Editor**: Craft clean HTML emails with bold, italic, underline, ordered/unordered lists, and hyperlinks.
- **Smart Attachment Auto-Mapping**: Upload a collection of PDF files (e.g., grade cards, invoices, certificates). The system automatically maps files to recipients based on exact ID matches or prefixed/suffixed filenames (e.g., `Report_1042.pdf` &rarr; Student `1042`).
- **Interactive Confidence Grid**:
  - Live search and filter across all columns.
  - Inline row editing for on-the-fly corrections without re-uploading spreadsheets.
  - One-click deletion of corrupted or test rows.
  - Automatic validation for missing, malformed, or duplicate email addresses.
- **RFC-Compliant Protocol Engineering**: Assembles raw multipart MIME messages with UTF-8 encoded subject headers, isolated boundaries, and RFC 2045 76-character base64-chunked attachments.
- **Quota Monitoring & Burst Throttling**: Built-in 2-second rate-limiting delays between dispatches to comply with Google Cloud API burst limits, accompanied by proactive alerts when datasets approach standard personal sending quotas.
- **External System Import Bridge**: Dedicated REST endpoints (`/api/import`) allowing internal school management systems or ERPs to stage batches and transfer operators directly into the pre-loaded dispatch interface.

---

## Acceptable Use Policy & Disclaimer

> [!IMPORTANT]
> ### Authorized Use Cases
> **Email Automator** is engineered strictly for **legitimate, authorized educational, academic, operational, and organizational communications**, including:
> - Academic faculty distributing student grades, transcripts, exam schedules, and course notices.
> - Educational administrators sending individualized admission, enrollment, or advisory updates.
> - Corporate, startup, and non-profit operators sending personalized transactional alerts, internal team memos, event schedules, or client billing statements.
> - Developers and systems researchers exploring OAuth-delegated email protocols and client-side data pipelines.

> [!CAUTION]
> ### Prohibited Uses & Abuse Prevention
> **This software is strictly prohibited from being utilized for malicious, disruptive, or deceptive operations**, including:
> - Disseminating unsolicited commercial electronic mail (Spam) in violation of CAN-SPAM, GDPR, or applicable regional statutory regulations.
> - Conducting phishing campaigns, social engineering attacks, credential harvesting, or identity fraud.
> - High-volume mail bombing, denial-of-service (DoS) attempts against receiving servers, or deliberate evasion of mail-filtering systems.
> - Email spoofing or forging sender identity headers.

### Google Sending Quotas & Deliverability Compliance

All dispatches are governed by Google's global sending policies. Senders are responsible for ensuring compliance with recipient consent laws and daily dispatch quotas:

| Account Category | Google 24-Hour Rolling Quota | Recommended Batch Size | Throttling |
| :--- | :--- | :--- | :--- |
| **Personal Gmail (`@gmail.com`)** | **500 emails / day** | $\le 450$ recipients | 2,000 ms per message |
| **Google Workspace (Education / Business)** | **2,000 emails / day** | $\le 1,800$ recipients | 2,000 ms per message |

*Disclaimer: The author and contributors accept no liability for any loss, account suspension, regulatory violation, or damages resulting from the use or misuse of this software.*

---

## Architecture & Security Model

```
+-------------------------------------------------------------+
|                      Client Browser                         |
|  - Papa Parse (In-memory CSV engine)                       |
|  - Handlebars Compiler                                      |
|  - Attachment Matcher                                       |
|  - Interactive Confidence Preview Grid (CRUD/Search)        |
+------------------------------+------------------------------+
                               | HTTPS (2s sequential delay)
                               v
+-------------------------------------------------------------+
|                    Next.js Server Layer                     |
|  - NextAuth Session Guard (verifies OAuth access token)     |
|  - RFC 2045 MIME Constructor & UTF-8 Base64 Formatter       |
+------------------------------+------------------------------+
                               | TLS 1.3 / OAuth 2.0
                               v
+-------------------------------------------------------------+
|                   Google Cloud (Gmail API)                  |
|  - Dispatched via sender's own Gmail account                |
|  - Appears natively in sender's "Sent" folder               |
|  - SPF/DKIM authenticated by Google infrastructure         |
+-------------------------------------------------------------+
```

For an in-depth breakdown of trust zones, MIME chunking, and architectural tradeoffs, refer to the [Systems Architecture Documentation](docs/ARCHITECTURE.md).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18.0 or later recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A Google Account (Personal `@gmail.com` or Google Workspace)

---

### Step 1: Google Cloud Console Setup

Email Automator authenticates via Google OAuth 2.0 to access the `gmail.send` API.

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. Enable the **Gmail API** under **APIs & Services > Library**.
3. Under **APIs & Services > OAuth consent screen**:
   - Set User Type to **External** (or **Internal** for Workspace).
   - Add scope: `https://www.googleapis.com/auth/gmail.send`.
   - Add your Google email under **Test users**.
4. Under **APIs & Services > Credentials**:
   - Click **Create Credentials** > **OAuth client ID** > **Web application**.
   - Add **Authorized JavaScript origin**: `http://localhost:3000`
   - Add **Authorized redirect URI**: `http://localhost:3000/api/auth/callback/google`
   - Copy your **Client ID** and **Client Secret**.

> 📖 **Need visual step-by-step guidance?** Read our comprehensive [Google OAuth Setup Guide](docs/GOOGLE_OAUTH_SETUP.md) for complete walkthroughs and troubleshooting instructions.

---

### Step 2: Installation & Configuration

1. **Clone the repository:**
   ```bash
   git clone https://github.com/syedmahi-dev/email-automator.git
   cd email-automator
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and populate your credentials:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_generated_random_secret
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret
   ```

   > **Generating a secret**: Run `openssl rand -base64 32` (or in PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))`) to produce a secure `NEXTAUTH_SECRET`.

---

### Step 3: Run the Application

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser. Click **Sign in with Google**, authorize the send-only permission, and begin personalizing your email batches.

---

## External Import API Specification

External systems (such as school portals, CRMs, or ERP backends) can programmatically preload recipient data into Email Automator without requiring manual CSV uploads.

### Endpoint: `POST /api/import`

**Request Body (`application/json`):**
```json
{
  "students": [
    { "id": "101", "name": "Jane Doe", "email": "jane@example.edu" },
    { "id": "102", "name": "John Smith", "email": "john@example.edu" }
  ],
  "marks": [
    { "id": "101", "midterm": "94", "final": "98" },
    { "id": "102", "midterm": "88", "final": "91" }
  ]
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "importId": "4a7f92b8c0e12d34567890abcdef1234",
  "redirectUrl": "http://localhost:3000/?importId=4a7f92b8c0e12d34567890abcdef1234"
}
```

When the operator navigates to `redirectUrl`, the frontend automatically fetches the staged dataset via `GET /api/import?id=<importId>` and populates the data tables.

---

## Project Structure

```
email-automator/
├── docs/
│   ├── ARCHITECTURE.md          # Deep dive into systems design, trust boundaries & MIME protocol
│   └── GOOGLE_OAUTH_SETUP.md    # Step-by-step Google Developer Console setup guide
├── public/                      # Static SVG icons and branding assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth Google OAuth handler
│   │   │   ├── import/route.ts              # External system data staging bridge
│   │   │   └── send-email/route.ts          # RFC 2045 MIME generator & Gmail API caller
│   │   ├── globals.css          # Editorial theme styling tokens & utility rules
│   │   ├── layout.tsx           # Root HTML layout and provider wrapping
│   │   └── page.tsx             # Main operational UI (Bulk & Manual sending pipelines)
│   └── components/
│       ├── CsvUploader.tsx      # Drag-and-drop CSV parser with Papa Parse
│       ├── DataPreview.tsx      # Interactive data table with inline editing & search
│       ├── EmailConfig.tsx      # Subject line, dynamic CC/BCC, and attachment manager
│       ├── GoogleSignIn.tsx     # OAuth status and Google authentication button
│       ├── LandingPage.tsx      # Pre-login informational hero & security overview
│       ├── Providers.tsx        # NextAuth SessionProvider wrapper
│       ├── RichTextEditor.tsx   # Lightweight browser WYSIWYG text editor
│       └── SmtpSetup.tsx        # Legacy direct-SMTP configuration reference
├── .env.example                 # Environment configuration exemplar
├── LICENSE                      # Official MIT License
├── package.json                 # Project dependencies and script definitions
└── tsconfig.json                # TypeScript compiler configuration
```

---

## License

This project is licensed under the **[MIT License](LICENSE)**.

```
Copyright (c) 2026 Syed Mahi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

Developed by **[Syed Mahi](https://github.com/syedmahi-dev)**.
