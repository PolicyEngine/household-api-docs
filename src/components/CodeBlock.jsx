'use client';

import { useEffect, useRef, useState } from 'react';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export default function CodeBlock({ code, language = 'python', title }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('prismjs').then((Prism) => {
        import('prismjs/components/prism-bash');
        import('prismjs/components/prism-python');
        import('prismjs/components/prism-json');
        if (codeRef.current) {
          Prism.default.highlightElement(codeRef.current);
        }
      });
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const langMap = {
    bash: 'language-bash',
    curl: 'language-bash',
    python: 'language-python',
    json: 'language-json',
  };

  return (
    <div className="rounded-lg border border-border-light overflow-hidden my-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-border-light">
          <span className="text-sm font-medium text-text-secondary">{title}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      {!title && (
        <div className="flex justify-end px-4 py-1 bg-gray-50 border-b border-border-light">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-gray-900 text-sm leading-relaxed m-0">
        <code ref={codeRef} className={langMap[language] || 'language-bash'}>
          {code}
        </code>
      </pre>
    </div>
  );
}
