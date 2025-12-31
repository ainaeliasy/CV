import React from 'react';
import { Download } from 'lucide-react';

export function DownloadPDFButton() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="download-pdf-btn"
      title="Télécharger en PDF (Ctrl+P)"
    >
      <Download className="w-5 h-5" />
      <span>Télécharger PDF</span>
    </button>
  );
}
