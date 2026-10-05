# Email Automator - Systems Architecture & Engineering Design

## 1. Executive Problem Definition

Sending an email via standard web forms is a trivial CRUD operation. However, executing **bulk personalized notifications across disparate institutional datasets** is a nuanced systems engineering challenge.

In educational institutions, universities, and small-to-medium enterprises, administrative communication frequently struggles with the following operational realities:
- **Disparate, Semi-Structured Data Sources**: Academic rosters, grade matrices, exam marks, and tuition billing data reside in disconnected spreadsheets created by different departments with inconsistent schemas.
- **High Blast-Radius for Errors**: Sending student A's grades or financial records to student B is a catastrophic breach of privacy and trust.
- **Credential & Security Anti-Patterns**: Asking operators to generate and save raw SMTP passwords or account credentials into third-party servers presents severe security and data governance liabilities.
- **Protocol Discrepancies**: The Gmail API does not ingest simple high-level JSON email abstractions for rich attachments; it requires fully-formed, RFC-compliant MIME payloads encoded in base64url.

**Email Automator** addresses these failure modes by acting as a **guarded execution pipeline** with strict trust boundaries, client-side data shaping, in-memory processing, and direct user-delegated OAuth dispatch.

---

## 2. System Architecture & Trust Boundaries

The system is partitioned into three distinct trust zones:

```mermaid
flowchart TD
    subgraph Browser ["Client Trust Zone (Browser Memory)"]
        CSV1["Primary CSV (e.g. Student List)"] --> Parser["Papa Parse Engine"]
        CSV2["Secondary CSV (e.g. Marks/Dues)"] --> Parser
        Parser --> Merger["Deterministic Join Engine"]
        Merger --> DataState["In-Memory Recipient Graph"]
        
        Files["Attachment Files"] --> AttMatcher["Filename Pattern Matcher"]
        AttMatcher --> DataState
        
        Template["Handlebars Template + RTE"] --> Compiler["Template Compiler"]
        DataState --> Compiler
        Compiler --> Preview["Interactive Confidence Grid (CRUD / Search)"]
    end

    subgraph Server ["Application Server Zone (Next.js App Router)"]
        Preview -->|Sequential Row Dispatch (2s throttle)| SendAPI["/api/send-email (POST)"]
        SendAPI --> SessionGuard["NextAuth Session & Token Guard"]
        SessionGuard --> MimeBuilder["RFC 2045 MIME Payload Assembler"]
        MimeBuilder --> Base64Url["Base64URL Encoder"]
    end

    subgraph GoogleInfra ["External Authority Zone (Google Cloud)"]
        Base64Url -->|Direct API Call| GmailAPI["Google Gmail REST API v1"]
        GmailAPI --> RecipientInbox["Recipient Mailbox"]
        GmailAPI --> SenderSent["Sender 'Sent' Folder"]
    end
```

### Trust Boundary Analysis

1. **Client Trust Zone (Browser Memory)**:
   - All sensitive datasets (student rosters, marks, addresses, attachments) are parsed and manipulated strictly inside the client's memory space using Papa Parse and browser Web APIs.
   - Zero spreadsheet rows or uploaded files are permanently persisted to any server-side database.
   - When the user closes or refreshes the tab, all working data in memory evaporates.

2. **Application Server Zone (Next.js Server)**:
   - Acts strictly as an authenticated execution proxy and MIME serializer.
   - Reads the caller's OAuth token from the secure NextAuth server session (`getServerSession(authOptions)`).
   - Generates raw MIME messages and streams them directly to Google.

3. **External Authority Zone (Google Cloud)**:
   - Outgoing messages are dispatched directly under the authenticated user's own identity.
   - Ensures strict deliverability symmetry, SPF/DKIM validation against Google's IP ranges, and automatic placement into the sender's official Sent folder.

---

## 3. Core Technical Subsystems

### 3.1. Deterministic Multi-Dataset Join Engine
Rather than requiring users to manually merge Excel files using complex `VLOOKUP` or `INDEX/MATCH` formulas, Email Automator provides an automated joining engine:
- Heuristically identifies candidate primary keys (columns containing `id`, `student_id`, `roll`, `email`, or index zero).
- Allows explicit column override via dual dropdown selectors.
- Executes case-insensitive, whitespace-trimmed equality matching between datasets:
  $$\text{Record}_{\text{merged}} = \text{Row}_1 \bowtie_{\text{Trim}(\text{Key}_1) = \text{Trim}(\text{Key}_2)} \text{Row}_2$$
- Preserves unmatched rows while assigning initial dispatch state flags (`pending`, `ready`, `failed`).

### 3.2. Dynamic Templating & Variable Binding
- Leverages **Handlebars.js** for deterministic string and HTML interpolation.
- Supports variable tokens dynamically populated from dataset column headers (e.g., `{{Name}}`, `{{Grade}}`, `{{AssignmentScore}}`).
- Both email body, subject line, CC, and BCC fields pass through the template engine per recipient row, enabling fully individualized correspondence.

### 3.3. Intelligent Attachment Auto-Matching
Personalized attachments (e.g., individual PDF report cards, certificates, fee receipts) are mapped automatically against dataset rows:
- Operators select an anchor column (e.g., `StudentID` or `RollNumber`).
- The matching algorithm evaluates normalized filename prefixes and suffixes:
  - Exact match: `StudentID.pdf`
  - Suffix match: `Report_StudentID.pdf`, `Grades-StudentID.pdf`
  - Prefix match: `StudentID_Report.pdf`, `StudentID-GradeSheet.pdf`
- Matched file count is visually reflected in the preview table before dispatch.

### 3.4. RFC 2045 & 2822 MIME Protocol Construction
The Gmail API v1 `users.messages.send` endpoint requires a single RFC-compliant raw MIME payload rather than structured JSON parameters. The backend route (`/api/send-email/route.ts`) implements raw protocol formatting:
1. **Header Normalization**: Encodes non-ASCII subjects into UTF-8 Base64 encoded-words (`=?utf-8?B?...?=`).
2. **Multipart Boundary Isolation**: Generates cryptographically isolated MIME boundary tags (`----=_Part_${random}`).
3. **Base64 Line Chunking**: Conforms to RFC 2045 §6.7 by chunking base64-encoded binary attachments into exact 76-character line lengths terminated by CRLF (`\r\n`).
4. **URL-Safe Base64 Serialization**: Encodes the final MIME string into RFC 4648 Base64URL format (`+` to `-`, `/` to `_`, stripped padding `=`).

---

## 4. Operator Safety & Confidence Controls

Human-in-the-loop validation is built into the workflow to prevent accidental mass transmissions:
- **Interactive Confidence Grid**: Full live table rendering every merged field, resolved CC/BCC targets, and matched attachment counts.
- **Inline Row Editing**: On-the-fly corrections to recipient emails, names, or values directly within the grid without needing to re-upload the spreadsheet.
- **Row Removal & Instant Filtering**: Instant search across all columns to inspect high-risk rows or remove invalid entries.
- **Visual Status Badging**: Instant detection of malformed or missing email addresses (`No Email`, `Invalid`, `Ready`, `Sending`, `Sent`, `Failed`).
- **Quota Throttling & Burst Protection**:
  - Implements a mandatory 2-second delay between sequential outgoing requests to prevent rate-limit rejections.
  - Displays proactive warnings when loaded rows exceed the standard personal Gmail 24-hour dispatch ceiling (500 recipients).
- **Targeted Failure Retry**: Allows operators to retry only failed deliveries without re-sending duplicates to recipients who already received the message.

---

## 5. Security & Privacy Guarantees

| Security Vector | Implementation Detail | Guarantee |
| :--- | :--- | :--- |
| **Google OAuth Scope** | `https://www.googleapis.com/auth/gmail.send` | Least privilege: cannot read inbox, draft, or delete emails. |
| **Data Retention** | Processed in volatile browser memory | Zero server-side persistence for CSV contents or attachments. |
| **Transport Security** | TLS 1.3 throughout all API routes | In-flight payload encryption. |
| **Credential Storage** | NextAuth JWT encrypted session | No raw user passwords or app tokens stored in databases. |
| **Sender Authenticity** | Outgoing mail signed by Google's native DKIM/SPF | Eliminates spam-filter penalties associated with shared relay IPs. |

---

## 6. External Automation Bridge (Import API)

For institutional integrations where an upstream student information system (SIS) or ERP generates recipient batches, Email Automator includes an external import route:

- **`POST /api/import`**: Accepts JSON arrays of `students` and `marks`, generating a secure 128-bit hex `importId` and redirect URL.
- **`GET /api/import?id=<importId>`**: Retrieves and loads the staged dataset directly into the client-side state on launch.
