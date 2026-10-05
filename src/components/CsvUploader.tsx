"use client";

import { useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud, CheckCircle2, FileSpreadsheet } from 'lucide-react';

export default function CsvUploader({ title, onData }: any) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rowCount, setRowCount] = useState(0);

  const handleFile = (file: File) => {
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        setRowCount(results.data.length);
        onData(results.data);
      }
    });
  };

  const onDragOver = (e: any) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: any) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <div className="icon"><FileSpreadsheet size={16} /></div>
          {title}
        </div>
      </div>
      <label 
        className={`dropzone ${dragging ? 'active' : ''} ${fileName ? 'done' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input 
          type="file" accept=".csv" 
          style={{ display: 'none' }}
          onChange={(e) => { if (e.target.files && e.target.files.length > 0) handleFile(e.target.files[0]); }}
        />
        {fileName ? (
           <>
             <CheckCircle2 size={24} style={{ color: 'var(--success)' }} />
             <span style={{ color: 'var(--success)', fontWeight: 500, fontSize: '0.875rem' }}>{fileName}</span>
             <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{rowCount} rows loaded · Click to replace</span>
           </>
        ) : (
           <>
             <UploadCloud size={24} style={{ color: 'var(--text-muted)' }} />
             <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Drop CSV here or click to browse</span>
           </>
        )}
      </label>
    </div>
  );
}
