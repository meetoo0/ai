
import React from 'react';

export const AudioIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.75a.75.75 0 00-.75.75v12a.75.75 0 001.5 0V3.5a.75.75 0 00-.75-.75z" />
    <path fillRule="evenodd" d="M9.006 4.008A5.502 5.502 0 003.5 9.51v4.982A5.502 5.502 0 009.006 20a5.502 5.502 0 005.506-5.508V9.51a5.502 5.502 0 00-5.506-5.502zM5.002 9.51a3.999 3.999 0 013.88-3.992L9 5.51v8.982l-.122.006a3.999 3.999 0 01-3.878-3.996V9.51z" clipRule="evenodd" />
    <path d="M15 9.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0V9.5z" />
  </svg>
);

export const LoadingSpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
        <path fillRule="evenodd" d="M10.868 2.884c.321.64.321 1.415 0 2.055l-1.42 2.84a1.5 1.5 0 0 0 1.11 2.253l2.84 1.42c.64.321 1.415.321 2.055 0l2.84-1.42a1.5 1.5 0 0 0 1.11-2.253l-1.42-2.84c-.321-.64-.321-1.415 0-2.055l1.42-2.84a1.5 1.5 0 0 0-1.11-2.253l-2.84-1.42a1.5 1.5 0 0 0-2.055 0l-2.84 1.42A1.5 1.5 0 0 0 8.028 2.884l1.42 2.84a1.5 1.5 0 0 0 1.42 1.42l2.84 1.42a.5.5 0 0 1 0 .708l-2.84 1.42a1.5 1.5 0 0 0-1.42 1.42l-1.42 2.84a.5.5 0 0 1-.708 0l-1.42-2.84a1.5 1.5 0 0 0-1.42-1.42l-2.84-1.42a.5.5 0 0 1 0-.708l2.84-1.42a1.5 1.5 0 0 0 1.42-1.42l1.42-2.84a.5.5 0 0 1 .708 0z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.905 3.129V2.75Z" />
    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
  </svg>
);
