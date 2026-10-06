import { useEffect, useRef } from 'react';
import { Bold, Italic, Underline, List, Link } from 'lucide-react';

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isTyping = useRef(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value && !isTyping.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML || '');
  };

  const handleInput = () => {
    if (editorRef.current) {
      isTyping.current = true;
      onChange(editorRef.current.innerHTML);
      setTimeout(() => { isTyping.current = false; }, 100);
    }
  };

  const addLink = () => {
    const url = prompt('Enter link URL:');
    if (url) exec('createLink', url);
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-input)' }}>
      <div className="rte-toolbar">
        <button type="button" onClick={() => exec('bold')} className="rte-btn" title="Bold"><Bold size={15} /></button>
        <button type="button" onClick={() => exec('italic')} className="rte-btn" title="Italic"><Italic size={15} /></button>
        <button type="button" onClick={() => exec('underline')} className="rte-btn" title="Underline"><Underline size={15} /></button>
        <div className="rte-divider" />
        <button type="button" onClick={() => exec('insertUnorderedList')} className="rte-btn" title="Bullet List"><List size={15} /></button>
        <button type="button" onClick={addLink} className="rte-btn" title="Link"><Link size={15} /></button>
      </div>
      <div 
        ref={editorRef}
        className="rte-body"
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
      />
    </div>
  );
}
