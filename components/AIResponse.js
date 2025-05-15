'use client';

import React from 'react';

// Simple parser for basic formatting: bold headers, lists, and paragraphs
// You can customize this as per your AI output format

export default function AIResponse({ text }) {
  if (!text) return null;

  // Split text by double line breaks for paragraphs
  const paragraphs = text.split('\n\n');

  return (
    <div className="prose dark:prose-invert max-w-none">
      {paragraphs.map((para, i) => {
        // Check if paragraph starts with "# " (header)
        if (para.startsWith('# ')) {
          return (
            <h2 key={i} className="font-bold text-xl mb-2">
              {para.replace('# ', '')}
            </h2>
          );
        }

        // Check if paragraph starts with "- " or "* " (list)
        if (para.startsWith('- ') || para.startsWith('* ')) {
          const items = para.split('\n').map((line) => line.replace(/^[-*] /, ''));
          return (
            <ul key={i} className="list-disc list-inside mb-4">
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          );
        }

        // Otherwise render as paragraph with basic bold/italic support (optional)
        return (
          <p key={i} className="mb-4 whitespace-pre-wrap">
            {para}
          </p>
        );
      })}
    </div>
  );
}
