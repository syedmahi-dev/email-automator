import { AlertCircle, CheckCircle, Clock, Paperclip, Users, Pen, X, Trash2, Search, Table } from 'lucide-react';
import Handlebars from 'handlebars';
import { useState, useMemo } from 'react';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function DataPreview({ data, ccTemplate, bccTemplate, attachments, matchColumn, sendToColumn, onUpdateRow, onDeleteRow }: any) {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editedRowData, setEditedRowData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');

  const headers = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter(k => k !== 'status');
  }, [data]);

  const compiledCc = useMemo(() => {
    if (!ccTemplate) return null;
    try { return Handlebars.compile(ccTemplate); } catch { return null; }
  }, [ccTemplate]);

  const compiledBcc = useMemo(() => {
    if (!bccTemplate) return null;
    try { return Handlebars.compile(bccTemplate); } catch { return null; }
  }, [bccTemplate]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data.map((row: any, i: number) => ({ ...row, _originalIndex: i }));
    const q = searchQuery.toLowerCase();
    return data
      .map((row: any, i: number) => ({ ...row, _originalIndex: i }))
      .filter((row: any) => headers.some(h => String(row[h] || '').toLowerCase().includes(q)));
  }, [data, searchQuery, headers]);

  const showExtras = ccTemplate || bccTemplate || (attachments && attachments.length > 0);

  const startEditing = (originalIndex: number, row: any) => {
    setEditingRowIndex(originalIndex);
    const { status, _originalIndex, ...editableData } = row;
    setEditedRowData(editableData);
  };

  const saveEditing = () => {
    if (editingRowIndex === null) return;
    if (onUpdateRow) {
      const existingRow = data[editingRowIndex];
      onUpdateRow(editingRowIndex, { ...editedRowData, status: existingRow?.status || 'pending' });
    }
    setEditingRowIndex(null);
  };

  const cancelEditing = () => { setEditingRowIndex(null); };

  const handleDelete = (originalIndex: number) => {
    if (onDeleteRow) onDeleteRow(originalIndex);
    if (editingRowIndex === originalIndex) setEditingRowIndex(null);
  };

  const getStatusBadge = (status: string, email: string) => {
    if (!email) return <span className="badge badge-error">No Email</span>;
    if (!isValidEmail(email)) return <span className="badge badge-warning">Invalid</span>;
    switch(status) {
      case 'success': return <span className="badge badge-success"><CheckCircle size={10} /> Sent</span>;
      case 'failed': return <span className="badge badge-error"><AlertCircle size={10} /> Failed</span>;
      case 'sending': return <span className="badge badge-warning"><Clock size={10} /> Sending</span>;
      default: return <span className="badge badge-neutral">Ready</span>;
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title"><div className="icon"><Table size={16} /></div>Data Preview</div>
        </div>
        <div className="flex flex-col items-center justify-center" style={{ padding: '64px 0', border: '1px dashed var(--border)', borderRadius: '12px', background: 'var(--bg)' }}>
           <Table size={32} style={{ color: 'var(--text-muted)', opacity: 0.5, marginBottom: '16px' }} />
           <p style={{ fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>No data loaded</p>
           <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Upload a CSV file to preview and manage your email data here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div className="preview-toolbar flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="card-title" style={{ marginBottom: 0 }}>
          <div className="icon"><Table size={16} /></div>
          Data Preview
        </div>
        <div className="flex items-center gap-3">
          <div className="search-wrap">
            <Search size={13} className="search-icon" />
            <input className="search-input" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {searchQuery ? `${filteredData.length} of ${data.length}` : `${data.length} rows`}
          </span>
        </div>
      </div>
      
      <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '12px' }}>
        <span className="only-pointer">Hover any row to edit or remove it.</span>
        <span className="only-touch">Tap Edit to modify rows.</span>
      </p>

      <style>{`
        .desktop-table { display: block; }
        .mobile-cards { display: none; }
        @media (max-width: 640px) {
          .desktop-table { display: none; }
          .mobile-cards { display: block; }
        }
      `}</style>
      
      <div className="desktop-table overflow-x-auto overflow-y-auto max-h-96" style={{ borderRadius: '10px', border: '1px solid var(--border)' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>#</th>
              {headers.map(h => <th key={h}>{h}</th>)}
              {showExtras && <th>CC / BCC</th>}
              {showExtras && <th>Files</th>}
              <th>Status</th>
              <th style={{ width: '72px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row: any) => {
              const idx = row._originalIndex;
              let cc = '', bcc = '';
              if (compiledCc) { try { cc = compiledCc(row); } catch {} }
              if (compiledBcc) { try { bcc = compiledBcc(row); } catch {} }
              
              let matchedFiles = 0;
              if (matchColumn && row[matchColumn] && attachments) {
                const mv = String(row[matchColumn]).trim().toLowerCase();
                matchedFiles = attachments.filter((f: any) => {
                  const n = f.name.replace(/\.[^.]+$/, '').toLowerCase();
                  return n === mv || n.endsWith(`_${mv}`) || n.endsWith(`-${mv}`) || n.startsWith(`${mv}_`) || n.startsWith(`${mv}-`);
                }).length;
              }

              const isEditing = editingRowIndex === idx;
              const emailKey = sendToColumn || headers.find(k => k.toLowerCase() === 'email') || headers.find(k => k.toLowerCase().includes('email'));
              const emailValue = emailKey ? row[emailKey] : '';

              return (
                <tr key={idx} className={`data-row${isEditing ? ' editing' : ''}`}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textAlign: 'center' }}>{idx + 1}</td>
                  {headers.map(h => (
                    <td key={h}>
                      {isEditing ? (
                        <input className="edit-input" value={editedRowData[h] || ''} onChange={(e) => setEditedRowData({ ...editedRowData, [h]: e.target.value })} />
                      ) : (
                        <span style={{ display: 'block', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row[h] || '-'}</span>
                      )}
                    </td>
                  ))}
                  {showExtras && (
                    <td style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', maxWidth: '120px' }}>
                      {cc && <div>CC: {cc}</div>}
                      {bcc && <div>BCC: {bcc}</div>}
                      {!cc && !bcc && '-'}
                    </td>
                  )}
                  {showExtras && (
                    <td style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {matchedFiles > 0 ? <span className="flex items-center gap-1" style={{ color: 'var(--accent)' }}><Paperclip size={11} /> {matchedFiles}</span> : '-'}
                    </td>
                  )}
                  <td>{getStatusBadge(row.status, emailValue)}</td>
                  <td style={{ textAlign: 'right', padding: '6px 10px' }}>
                    <div className="flex items-center justify-between gap-1" style={{ justifyContent: 'flex-end' }}>
                       {isEditing ? (
                         <>
                           <button className="btn btn-accent btn-icon" style={{ width: '28px', height: '28px' }} onClick={saveEditing} title="Save"><CheckCircle size={13} /></button>
                           <button className="btn btn-ghost btn-icon" style={{ width: '28px', height: '28px' }} onClick={cancelEditing} title="Cancel"><X size={13} /></button>
                         </>
                       ) : (
                         <div className="row-actions flex gap-1">
                           <button className="btn btn-ghost btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => startEditing(idx, row)} title="Edit"><Pen size={13} /></button>
                           <button className="btn btn-ghost btn-icon" style={{ width: '28px', height: '28px', color: 'var(--error)' }} onClick={() => handleDelete(idx)} title="Remove"><Trash2 size={13} /></button>
                         </div>
                       )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mobile-cards">
        <ul className="row-cards">
          {filteredData.map((row: any) => {
            const idx = row._originalIndex;
            let cc = '', bcc = '';
            if (compiledCc) { try { cc = compiledCc(row); } catch {} }
            if (compiledBcc) { try { bcc = compiledBcc(row); } catch {} }
            
            let matchedFiles = 0;
            if (matchColumn && row[matchColumn] && attachments) {
              const mv = String(row[matchColumn]).trim().toLowerCase();
              matchedFiles = attachments.filter((f: any) => {
                const n = f.name.replace(/\.[^.]+$/, '').toLowerCase();
                return n === mv || n.endsWith(`_${mv}`) || n.endsWith(`-${mv}`) || n.startsWith(`${mv}_`) || n.startsWith(`${mv}-`);
              }).length;
            }

            const isEditing = editingRowIndex === idx;
            const emailKey = sendToColumn || headers.find(k => k.toLowerCase() === 'email') || headers.find(k => k.toLowerCase().includes('email'));
            const emailValue = emailKey ? row[emailKey] : '';

            return (
              <li key={idx} className={`row-card ${isEditing ? 'editing' : ''}`}>
                <div className="row-card-head">
                  <span className="row-card-index">#{idx + 1}</span>
                  {getStatusBadge(row.status, emailValue)}
                </div>
                <dl className="row-card-fields">
                  {headers.map(h => (
                    <div style={{ display: 'contents' }} key={h}>
                      <dt>{h}</dt>
                      <dd>
                        {isEditing ? (
                          <input className="edit-input" value={editedRowData[h] || ''} onChange={(e) => setEditedRowData({ ...editedRowData, [h]: e.target.value })} />
                        ) : (
                          <span>{row[h] || '-'}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                  {showExtras && (
                    <div style={{ display: 'contents' }}>
                      <dt>CC / BCC</dt>
                      <dd>{cc || bcc ? `${cc ? `CC: ${cc}` : ''} ${bcc ? `BCC: ${bcc}` : ''}` : '-'}</dd>
                      <dt>Files</dt>
                      <dd>{matchedFiles > 0 ? `${matchedFiles} attached` : '-'}</dd>
                    </div>
                  )}
                </dl>
                <div className="row-card-actions">
                  {isEditing ? (
                    <>
                      <button className="btn btn-accent btn-sm" onClick={saveEditing}><CheckCircle size={14} /> Save</button>
                      <button className="btn btn-ghost btn-sm" onClick={cancelEditing}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-ghost btn-sm" onClick={() => startEditing(idx, row)}><Pen size={14} /> Edit</button>
                      <button className="btn btn-ghost btn-sm btn-danger" onClick={() => handleDelete(idx)}><Trash2 size={14} /> Remove</button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
