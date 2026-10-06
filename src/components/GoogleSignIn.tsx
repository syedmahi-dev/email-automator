"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, CheckCircle2 } from "lucide-react";

export default function GoogleSignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="card text-center" style={{ padding: '48px 24px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
        <div style={{ height: '28px', width: '200px', background: 'var(--bg-input)', margin: '0 auto 8px', borderRadius: '6px' }} />
        <div style={{ height: '14px', width: '100%', maxWidth: '320px', background: 'var(--bg-input)', margin: '0 auto 24px', borderRadius: '4px' }} />
        <div style={{ height: '40px', width: '160px', background: 'var(--bg-input)', margin: '0 auto', borderRadius: '10px' }} />
      </div>
    );
  }

  if (session) {
    return (
      <div className="user-card">
        <img 
          src={session.user?.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
          alt="Profile" 
          className="user-avatar"
        />
        <div className="user-info">
          <div className="user-name">
            {session.user?.name}
            <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
          </div>
          <div className="user-email">{session.user?.email}</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => signOut()}>
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="card text-center" style={{ padding: '48px 24px' }}>
      <h2 className="mb-2">Connect your Google Account</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
        Authenticate through Google to send emails securely. We only request permission to send emails on your behalf.
      </p>
      <button className="btn btn-accent" onClick={() => signIn("google")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
