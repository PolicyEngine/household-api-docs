'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export default function CodeBlock({ code, language = 'python', title, output, outputImage, outputImageAlt }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const langMap = {
    curl: 'bash',
  };

  return (
    <div className="rounded-lg border border-border-light overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-border-light">
        <span className="text-sm font-medium text-text-secondary">{title || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={langMap[language] || language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '14px',
          lineHeight: '1.6',
        }}
      >
        {code}
      </SyntaxHighlighter>
      {(output || outputImage) && (
        <>
          <div className="flex items-center px-4 py-2 bg-gray-50 border-y border-border-light">
            <span className="text-sm font-medium text-text-secondary">Output</span>
          </div>
          {outputImage ? (
            <div className="flex items-center justify-center bg-white px-4 py-4">
              <img
                src={outputImage}
                alt={outputImageAlt || 'Output chart'}
                className="h-auto w-full max-w-3xl"
              />
            </div>
          ) : (
            <pre
              className="m-0 overflow-x-auto px-4 py-3 font-mono"
              style={{
                backgroundColor: '#282c34',
                color: '#abb2bf',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              {output}
            </pre>
          )}
        </>
      )}
    </div>
  );
}
