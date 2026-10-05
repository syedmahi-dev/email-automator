"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import GoogleSignIn from '@/components/GoogleSignIn';
import CsvUploader from '@/components/CsvUploader';
import EmailConfig from '@/components/EmailConfig';
import DataPreview from '@/components/DataPreview';
import LandingPage from '@/components/LandingPage';
import { Send, Loader2, AlertTriangle, RotateCcw, Link as LinkIcon, User, Layers, Mail } from 'lucide-react';

import Handlebars from 'handlebars';

function HomeContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const importId = searchParams.get('importId');
  
  const [mode, setMode] = useState<'bulk' | 'manual'>('bulk');

  // Bulk State
  const [file1Data, setFile1Data] = useState<any[]>([]);
  const [file2Data, setFile2Data] = useState<any[]>([]);
  const [joinKey1, setJoinKey1] = useState<string>("");
  const [joinKey2, setJoinKey2] = useState<string>("");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');
  
  const [bulkTemplate, setBulkTemplate] = useState("<p>Hello {{Name}},</p><p>We have an important update for you: {{Variable1}}</p><p>Best regards,<br/>Teacher</p>");
  const [bulkSubject, setBulkSubject] = useState("Important Announcement");
  const [bulkCc, setBulkCc] = useState("");
  const [bulkBcc, setBulkBcc] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentMatchColumn, setAttachmentMatchColumn] = useState("");
  const [sendToColumn, setSendToColumn] = useState<string>("");
  
  const [dataList, setDataList] = useState<any[]>([]);
  const [isSendingBulk, setIsSendingBulk] = useState(false);
  const [progress, setProgress] = useState({ total: 0, current: 0, success: 0, failed: 0 });

  // Manual State
  const [manualTo, setManualTo] = useState("");
  const [manualSubject, setManualSubject] = useState("");
  const [manualBody, setManualBody] = useState("");
  const [manualCc, setManualCc] = useState("");
  const [manualBcc, setManualBcc] = useState("");
  const [manualAttachments, setManualAttachments] = useState<File[]>([]);
  const [manualStatus, setManualStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  // Handle external import ID
  useEffect(() => {
    if (importId) {
      setIsImporting(true);
      fetch(`/api/import?id=${importId}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) { setImportError(data.error); }
          else {
            if (data.students) setFile1Data(data.students);
            if (data.marks) setFile2Data(data.marks);
          }
          setIsImporting(false);
        })
        .catch(() => { setImportError('Failed to load external data'); setIsImporting(false); });
    }
  }, [importId]);

  // Merge CSV Data
  useEffect(() => {
    if (file1Data.length > 0 && !joinKey1) {
      setJoinKey1(Object.keys(file1Data[0]).find(k => k.toLowerCase() === 'id') || Object.keys(file1Data[0])[0]);
    }
  }, [file1Data]);

  useEffect(() => {
    if (file2Data.length > 0 && !joinKey2) {
      setJoinKey2(Object.keys(file2Data[0]).find(k => k.toLowerCase() === 'id') || Object.keys(file2Data[0])[0]);
    }
  }, [file2Data]);

  useEffect(() => {
    if (file1Data.length === 0) { setDataList([]); return; }
    const merged = file1Data.map(row1 => {
      let matchedRow = {};
      if (file2Data.length > 0 && joinKey1 && joinKey2) {
        matchedRow = file2Data.find(row2 => String(row2[joinKey2]).trim().toLowerCase() === String(row1[joinKey1]).trim().toLowerCase()) || {};
      }
      return { ...row1, ...matchedRow, status: 'pending' };
    });
    setDataList(merged);
  }, [file1Data, file2Data, joinKey1, joinKey2]);

  // Auto-guess the sendToColumn if not set
  useEffect(() => {
    if (dataList.length > 0 && !sendToColumn) {
      const keys = Object.keys(dataList[0]);
      const guessedKey = keys.find(k => k.toLowerCase() === 'email') || keys.find(k => k.toLowerCase().includes('email'));
      if (guessedKey) setSendToColumn(guessedKey);
    }
  }, [dataList]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const sendSingleEmail = async (to: string, subject: string, html: string, cc?: string, bcc?: string, files?: File[]) => {
    const attachedFiles = [];
    if (files && files.length > 0) {
       for (const file of files) {
          const base64 = await fileToBase64(file);
          attachedFiles.push({ filename: file.name, mimeType: file.type, base64 });
       }
    }
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html, cc, bcc, attachments: attachedFiles })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json;
  };

  const handleManualSend = async () => {
    if (!manualTo || !manualSubject || !manualBody) return;
    setManualStatus('sending');
    try {
      await sendSingleEmail(manualTo, manualSubject, manualBody, manualCc, manualBcc, manualAttachments);
      setManualStatus('success');
      setTimeout(() => setManualStatus('idle'), 3000);
      setManualTo(""); setManualSubject(""); setManualBody(""); setManualCc(""); setManualBcc(""); setManualAttachments([]);
    } catch (e) {
      setManualStatus('error');
      setTimeout(() => setManualStatus('idle'), 3000);
    }
  };

  const startSendingBulk = async (retryOnly = false) => {
    setIsSendingBulk(true);
    let toSend = dataList;
    if (retryOnly) {
      toSend = dataList.filter(d => d.status === 'failed');
      setProgress(prev => ({ ...prev, total: toSend.length, current: 0, success: 0, failed: 0 }));
    } else {
      toSend = dataList.map(d => ({ ...d, status: 'pending' }));
      setDataList(toSend);
      setProgress({ total: toSend.length, current: 0, success: 0, failed: 0 });
    }

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < toSend.length; i++) {
      const item = toSend[i];
      const keys = Object.keys(item);
      const emailKey = sendToColumn || keys.find(k => k.toLowerCase() === 'email') || keys.find(k => k.toLowerCase().includes('email'));
      const email = emailKey ? String(item[emailKey]).trim() : null;
      const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      const idKey = Object.keys(item).find(k => k.toLowerCase() === 'id') || Object.keys(item)[0];
      const indexInDataList = dataList.findIndex(d => d[idKey] === item[idKey]);
      
      if (!email || !isValidEmail) {
        updateItemStatus(indexInDataList, 'failed');
        failCount++;
        continue;
      }

      updateItemStatus(indexInDataList, 'sending');
      
      let bodyHtml = bulkTemplate;
      let dynamicSubject = bulkSubject;
      let dynamicCc = bulkCc;
      let dynamicBcc = bulkBcc;
      
      try {
        bodyHtml = Handlebars.compile(bulkTemplate)(item);
        dynamicSubject = Handlebars.compile(bulkSubject)(item);
        if (bulkCc) dynamicCc = Handlebars.compile(bulkCc)(item);
        if (bulkBcc) dynamicBcc = Handlebars.compile(bulkBcc)(item);
      } catch(e) { console.error("Template compilation failed", e); }
      
      let attachedFiles: File[] = [];
      if (attachmentMatchColumn && item[attachmentMatchColumn]) {
        const matchValue = String(item[attachmentMatchColumn]).trim().toLowerCase();
        attachedFiles = attachments.filter((f: File) => {
          const nameWithoutExt = f.name.replace(/\.[^.]+$/, '').toLowerCase();
          return nameWithoutExt === matchValue || 
                 nameWithoutExt.endsWith(`_${matchValue}`) || 
                 nameWithoutExt.endsWith(`-${matchValue}`) ||
                 nameWithoutExt.startsWith(`${matchValue}_`) ||
                 nameWithoutExt.startsWith(`${matchValue}-`);
        });
      }

      try {
        await sendSingleEmail(email, dynamicSubject, bodyHtml, dynamicCc, dynamicBcc, attachedFiles);
        updateItemStatus(indexInDataList, 'success');
        successCount++;
      } catch (err) {
        updateItemStatus(indexInDataList, 'failed');
        failCount++;
      }

      setProgress(prev => ({ ...prev, current: i + 1, success: successCount, failed: failCount }));
      if (i < toSend.length - 1) await delay(2000);
    }
    setIsSendingBulk(false);
  };

  const updateItemStatus = (index: number, status: string) => {
    setDataList(prev => { const n = [...prev]; n[index] = { ...n[index], status }; return n; });
  };

  const handleUpdateRow = (index: number, newRowData: any) => {
    setDataList(prev => { const n = [...prev]; n[index] = newRowData; return n; });
  };

  const handleDeleteRow = (index: number) => {
    setDataList(prev => prev.filter((_, i) => i !== index));
  };

  const hasFailed = progress.failed > 0;
  const isFinished = progress.total > 0 && progress.current === progress.total;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="app-header">
        <div className="logo">
          <div className="logo-icon"><Mail size={18} color="white" /></div>
          <h1>Email Automator</h1>
        </div>
        {session && (
          <div className="tabs">
            <button className={`tab ${mode === 'bulk' ? 'active' : ''}`} onClick={() => setMode('bulk')}>
              <Layers size={15} /> Bulk
            </button>
            <button className={`tab ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>
              <User size={15} /> Manual
            </button>
          </div>
        )}
      </div>

      {status === 'loading' ? (
        <div className="card flex items-center justify-center" style={{ padding: '48px' }}>
          <Loader2 className="animate-spin" size={24} style={{ color: 'var(--text-muted)' }} />
        </div>
      ) : !session ? (
        <LandingPage />
      ) : (
        <div className="flex flex-col gap-6">
          <GoogleSignIn />
          
          {/* Manual Mode */}
          {mode === 'manual' && (
         <div className="card animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            <div className="card-header">
              <div className="card-title">
                <div className="icon"><Send size={16} /></div>
                Send Single Email
              </div>
            </div>
            <div className="flex flex-col gap-3">
               <div><label className="label">To</label><input className="input" type="email" value={manualTo} onChange={e => setManualTo(e.target.value)} placeholder="recipient@school.edu" /></div>
               <div className="grid grid-cols-2 gap-3">
                  <div><label className="label">CC</label><input className="input" value={manualCc} onChange={e => setManualCc(e.target.value)} placeholder="Optional" /></div>
                  <div><label className="label">BCC</label><input className="input" value={manualBcc} onChange={e => setManualBcc(e.target.value)} placeholder="Optional" /></div>
               </div>
               <div><label className="label">Subject</label><input className="input" value={manualSubject} onChange={e => setManualSubject(e.target.value)} placeholder="Assignment Update" /></div>
               <div><label className="label">Message</label><textarea className="input" rows={5} value={manualBody} onChange={e => setManualBody(e.target.value)} placeholder="Type your message..." /></div>
               <button 
                 className={`btn btn-accent ${manualStatus === 'success' ? '' : ''}`}
                 style={manualStatus === 'success' ? { background: 'var(--success)' } : manualStatus === 'error' ? { background: 'var(--error)' } : {}}
                 onClick={handleManualSend}
                 disabled={manualStatus === 'sending' || !manualTo || !manualSubject || !manualBody}
               >
                 {manualStatus === 'sending' && <Loader2 size={16} className="animate-spin" />}
                 {manualStatus === 'success' ? 'Sent!' : manualStatus === 'error' ? 'Failed' : 'Send Email'}
               </button>
            </div>
          </div>
      )}

      {/* Bulk Mode */}
      {mode === 'bulk' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {importId && isImporting && (
             <div className="card flex items-center justify-center gap-2" style={{ color: 'var(--accent)' }}>
                <Loader2 className="animate-spin" size={18} /> Fetching external data...
             </div>
          )}
          {importError && (
             <div className="card flex items-center gap-2" style={{ color: 'var(--error)', background: 'var(--error-bg)' }}>
                <AlertTriangle size={18} /> {importError}
             </div>
          )}
          {importId && !isImporting && !importError && (
             <div className="card flex items-center gap-2" style={{ borderColor: 'var(--success)', background: 'var(--success-bg)', color: 'var(--success)' }}>
                <LinkIcon size={18} /> Data loaded from external system.
             </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
             <CsvUploader title="Primary Data" onData={setFile1Data} />
             <CsvUploader title="Additional Data (Optional)" onData={setFile2Data} />
          </div>

          {file1Data.length > 0 && file2Data.length > 0 && (
            <div className="card flex items-center justify-between animate-fade-in" style={{ padding: '16px 24px', background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
               <div className="flex items-center gap-2" style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '0.875rem' }}>
                 <LinkIcon size={16} /> Match Columns to Merge Data
               </div>
               <div className="flex items-center gap-3">
                 <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Primary</span>
                 <select className="input" style={{ width: '180px', padding: '6px 10px' }} value={joinKey1} onChange={(e) => setJoinKey1(e.target.value)}>
                   {Object.keys(file1Data[0]).map(k => <option key={k} value={k}>{k}</option>)}
                 </select>
                 <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>= Additional</span>
                 <select className="input" style={{ width: '180px', padding: '6px 10px' }} value={joinKey2} onChange={(e) => setJoinKey2(e.target.value)}>
                   {Object.keys(file2Data[0]).map(k => <option key={k} value={k}>{k}</option>)}
                 </select>
               </div>
            </div>
          )}

          {dataList.length > 0 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <EmailConfig 
                 sendToColumn={sendToColumn} setSendToColumn={setSendToColumn}
                 subject={bulkSubject} setSubject={setBulkSubject}
                 template={bulkTemplate} setTemplate={setBulkTemplate}
                 cc={bulkCc} setCc={setBulkCc}
                 bcc={bulkBcc} setBcc={setBulkBcc}
                 attachments={attachments} setAttachments={setAttachments}
                 attachmentMatchColumn={attachmentMatchColumn} setAttachmentMatchColumn={setAttachmentMatchColumn}
                 availableKeys={Object.keys(dataList[0] || {}).filter(k => k !== 'status')}
              />
              
              <DataPreview 
                 data={dataList} 
                 ccTemplate={bulkCc}
                 bccTemplate={bulkBcc}
                 attachments={attachments}
                 matchColumn={attachmentMatchColumn}
                 sendToColumn={sendToColumn}
                 onUpdateRow={handleUpdateRow}
                 onDeleteRow={handleDeleteRow}
              />
              
              {progress.total > 0 && (
                 <div className="card animate-fade-in">
                   <div className="flex justify-between mb-2" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Progress: {progress.current} / {progress.total}</span>
                      <span className="flex gap-4">
                         <span style={{ color: 'var(--success)' }}>{progress.success} sent</span>
                         <span style={{ color: 'var(--error)' }}>{progress.failed} failed</span>
                      </span>
                   </div>
                   <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
                   </div>
                 </div>
              )}
              
              {dataList.length > 500 && (
                <div className="card flex items-start gap-3" style={{ background: 'var(--warning-bg)', borderColor: 'var(--warning-border)', padding: '16px 20px' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--warning)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: 'var(--warning)', fontSize: '0.875rem', marginBottom: '4px' }}>Google Account Sending Limits</h4>
                    <p style={{ color: 'var(--warning)', fontSize: '0.8125rem', opacity: 0.9 }}>
                      Standard Gmail accounts can only send <strong>500 emails per rolling 24 hours</strong> (2,000 for Google Workspace). You have {dataList.length} rows loaded. If you exceed this limit, Google will temporarily block your account from sending.
                    </p>
                  </div>
                </div>
              )}

              <div className="card flex items-center justify-between">
                <div>
                   <h3 className="mb-1">{isFinished ? 'Complete' : 'Ready to send'}</h3>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                     {isFinished ? 'All emails processed.' : 'Review data above. Missing or invalid emails will be skipped.'}
                   </p>
                </div>
                <div className="flex gap-2">
                   {isFinished && hasFailed && (
                     <button className="btn btn-ghost" onClick={() => startSendingBulk(true)} disabled={isSendingBulk}>
                       <RotateCcw size={15} /> Retry Failed
                     </button>
                   )}
                   <button className="btn btn-accent" disabled={dataList.length === 0 || isSendingBulk} onClick={() => startSendingBulk(false)}>
                     {isSendingBulk ? (<><Loader2 size={15} className="animate-spin" /> Sending...</>) : (<><Send size={15} /> {isFinished ? 'Send Again' : 'Send All'}</>)}
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-6 animate-pulse" style={{ padding: '48px 24px' }}>
        <div style={{ height: '40px', width: '200px', background: 'var(--bg-input)', borderRadius: '8px' }} />
        <div style={{ height: '300px', width: '100%', background: 'var(--bg-input)', borderRadius: '12px' }} />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
