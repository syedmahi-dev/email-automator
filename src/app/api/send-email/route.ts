import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return NextResponse.json({ success: false, error: "Unauthorized or missing access token" }, { status: 401 });
    }

    const body = await request.json();
    const { to, subject, html, cc, bcc, attachments } = body;

    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, error: "Missing email details" }, { status: 400 });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: 'v1', auth });

    const senderName = session.user?.name || '';
    const senderEmail = session.user?.email || '';
    const fromHeader = senderName ? `${senderName} <${senderEmail}>` : senderEmail;

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const boundary = `----=_Part_${Math.random().toString(36).substring(2)}`;

    let messageParts = [
      `From: ${fromHeader}`,
      `To: ${to}`,
      `Subject: ${utf8Subject}`,
      'MIME-Version: 1.0',
    ];

    if (cc) messageParts.push(`Cc: ${cc}`);
    if (bcc) messageParts.push(`Bcc: ${bcc}`);

    if (attachments && attachments.length > 0) {
       messageParts.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
       messageParts.push('');
       messageParts.push(`--${boundary}`);
       messageParts.push('Content-Type: text/html; charset=utf-8');
       messageParts.push('');
       messageParts.push(html);
       messageParts.push('');
       
       for (const att of attachments) {
          messageParts.push(`--${boundary}`);
          messageParts.push(`Content-Type: ${att.mimeType || 'application/octet-stream'}; name="${att.filename}"`);
          messageParts.push(`Content-Disposition: attachment; filename="${att.filename}"`);
          messageParts.push('Content-Transfer-Encoding: base64');
          messageParts.push('');
          // Chunk base64 into 76-character lines (RFC 2045)
          const b64 = att.base64;
          for (let i = 0; i < b64.length; i += 76) {
             messageParts.push(b64.substring(i, i + 76));
          }
          messageParts.push('');
       }
       messageParts.push(`--${boundary}--`);
    } else {
       messageParts.push('Content-Type: text/html; charset=utf-8');
       messageParts.push('');
       messageParts.push(html);
    }

    const message = messageParts.join('\r\n');

    // Encode base64url format
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return NextResponse.json({ success: true, messageId: res.data.id });
  } catch (error: any) {
    console.error("Gmail send error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
