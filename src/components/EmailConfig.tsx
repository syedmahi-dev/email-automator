import { useState } from 'react';
import { PenLine, Paperclip, Users, ChevronDown, ChevronUp, X, File as FileIcon, Settings2 } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

export default function EmailConfig({ 
  sendToColumn, setSendToColumn,
  subject, setSubject, 
  template, setTemplate, 
  cc, setCc,
  bcc, setBcc,
  attachments, setAttachments,
  attachmentMatchColumn, setAttachmentMatchColumn,
  availableKeys 
}: any) {
  
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev: File[]) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachments((prev: File[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <div className="icon"><PenLine size={16} /></div>
          Compose Email
        </div>
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="btn btn-ghost btn-sm"
        >
          <Settings2 size={14} />
          {showAdvanced ? 'Hide' : 'CC / BCC / Files'}
          {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {showAdvanced && (
          <div className="advanced-panel animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label"><Users size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> CC</label>
                <input type="text" className="input" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="email@example.com or {{ParentEmail}}" />
              </div>
              <div>
                <label className="label"><Users size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> BCC</label>
                <input type="text" className="input" value={bcc} onChange={(e) => setBcc(e.target.value)} placeholder="Hidden copies..." />
              </div>
            </div>
            <div className="mt-3">
              <label className="label"><Paperclip size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Attachments</label>
              <div className="attach-row">
                <div>
                  <div className="dropzone" style={{ padding: '16px', position: 'relative' }}>
                    <input type="file" multiple style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} onChange={handleFileChange} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Drop files or click to select</span>
                  </div>
                </div>
                <div>
                  <label className="label-hint" style={{ display: 'block', marginBottom: '4px' }}>Match filename to column:</label>
                  <select className="input" value={attachmentMatchColumn} onChange={(e) => setAttachmentMatchColumn(e.target.value)}>
                    <option value="">-- No auto-matching --</option>
                    {availableKeys && availableKeys.map((k: string) => (
                      <option key={k} value={k}>Match "{k}"</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {attachments.length > 0 && (
                <div className="flex gap-2" style={{ marginTop: '10px', flexWrap: 'wrap' }}>
                  {attachments.map((file: File, idx: number) => (
                    <div key={idx} className="file-chip">
                      <FileIcon size={12} style={{ color: 'var(--accent)' }} />
                      <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.name}>{file.name}</span>
                      <button onClick={() => removeFile(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: '2px' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="label">
            Recipient Email Column
            <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '6px' }}>
              (Select which column in your CSV contains recipient email addresses)
            </span>
          </label>
          <select className="input mb-4" value={sendToColumn} onChange={(e) => setSendToColumn(e.target.value)}>
             <option value="">-- Select Email Column from CSV --</option>
             {availableKeys && availableKeys.map((k: string) => (
               <option key={k} value={k}>{k}</option>
             ))}
          </select>

          <label className="label">Subject Line</label>
          <input type="text" className="input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Your grades, {{Name}}!" />
        </div>
        
        <div>
          <label className="label">Message Body</label>
          <RichTextEditor value={template} onChange={setTemplate} />
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            <span className="var-list-label">Click to Insert Variable:</span>
            {availableKeys && availableKeys.length > 0 ? (
              availableKeys.map((key: string) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTemplate((prev: string) => prev + ` {{${key}}}`)}
                  className="var-pill"
                  title={`Click to insert {{${key}}} into message`}
                >
                  + {`{{${key}}}`}
                </button>
              ))
            ) : (
              <span className="var-list-label" style={{ fontStyle: 'italic' }}>Upload CSV data to detect columns as dynamic variables</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
