import { Server, User, KeyRound } from 'lucide-react';

export default function SmtpSetup({ smtp, setSmtp }: any) {
  return (
    <div className="card">
      <h2 className="mb-4 flex items-center gap-2">
        <Server size={20} className="text-primary" />
        SMTP Configuration
      </h2>
      <div className="grid grid-cols-2 gap-4 responsive-grid-2">
        <div>
          <label className="input-label">SMTP Host</label>
          <input 
            type="text" 
            className="input" 
            value={smtp.host}
            onChange={e => setSmtp({ ...smtp, host: e.target.value })}
            placeholder="e.g. smtp.gmail.com"
          />
        </div>
        <div>
          <label className="input-label">Port</label>
          <input 
            type="number" 
            className="input" 
            value={smtp.port}
            onChange={e => setSmtp({ ...smtp, port: Number(e.target.value) })}
            placeholder="e.g. 465"
          />
        </div>
        <div>
          <label className="input-label flex items-center gap-1">
             <User size={14} /> Email Address
          </label>
          <input 
            type="email" 
            className="input" 
            value={smtp.user}
            onChange={e => setSmtp({ ...smtp, user: e.target.value })}
            placeholder="your-email@gmail.com"
          />
        </div>
        <div>
          <label className="input-label flex items-center gap-1">
             <KeyRound size={14} /> App Password
          </label>
          <input 
            type="password" 
            className="input" 
            value={smtp.pass}
            onChange={e => setSmtp({ ...smtp, pass: e.target.value })}
            placeholder="16-character app password"
          />
        </div>
      </div>
      <p className="text-xs text-muted mt-4">
        * For Gmail, you must use an <a href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noreferrer" className="text-primary">App Password</a> rather than your normal password.
      </p>
    </div>
  );
}
