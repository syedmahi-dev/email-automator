import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), '.data', 'imports');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { students, marks } = body;

    if (!students || !marks) {
      return NextResponse.json({ error: "Missing students or marks array" }, { status: 400 });
    }

    const importId = crypto.randomBytes(16).toString('hex');
    const filePath = path.join(DATA_DIR, `${importId}.json`);

    // Save the payload temporarily
    fs.writeFileSync(filePath, JSON.stringify({ students, marks }), 'utf-8');

    // Return the redirect URL (frontend will handle the rest)
    // Using a relative URL or absolute based on request origin
    const url = new URL(request.url);
    const redirectUrl = `${url.protocol}//${url.host}/?importId=${importId}`;

    return NextResponse.json({ success: true, importId, redirectUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const importId = searchParams.get('id');

    if (!importId || !/^[a-f0-9]{32}$/.test(importId)) {
      return NextResponse.json({ error: "Invalid import ID" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, `${importId}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Import data not found or expired" }, { status: 404 });
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    
    // Optionally delete the file after reading it so it can only be used once
    // fs.unlinkSync(filePath); 

    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
