import React, { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';

export function DownloadPDFButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    setIsSuccess(false);

    const PDF_FILENAME = 'CV_Eliasy_Rakotomalalaniaina.pdf';

    // Déterminer l'URL de base (dev ou prod)
    const isLocalDev = window.location.hostname === 'localhost' && window.location.port === '5173';
    const apiBase = isLocalDev ? 'http://localhost:3001' : '';
    const downloadUrl = isLocalDev ? `${apiBase}/download-pdf` : '/api/download-pdf';
    const generateUrl = isLocalDev ? `${apiBase}/generate-pdf` : '/api/generate-pdf';

    const triggerDownload = (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = PDF_FILENAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };

    try {
      // 1. Essayer de télécharger le PDF pré-généré
      const downloadResponse = await fetch(downloadUrl);

      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob();
        triggerDownload(blob);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        return;
      }

      // 2. Si pas de PDF disponible, lancer la génération serveur (Puppeteer)
      const genResponse = await fetch(generateUrl, { method: 'POST' });

      if (!genResponse.ok) {
        throw new Error('Échec de la génération du PDF sur le serveur.');
      }

      // 3. Télécharger le PDF fraîchement généré
      const freshDownload = await fetch(downloadUrl);

      if (!freshDownload.ok) {
        throw new Error('Le PDF a été généré mais le téléchargement a échoué.');
      }

      const blob = await freshDownload.blob();
      triggerDownload(blob);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur PDF:', error);
      alert('Le téléchargement du CV est temporairement indisponible. Veuillez réessayer plus tard.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="download-pdf-btn"
      title="Télécharger en PDF"
    >
      {isGenerating ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isSuccess ? (
        <Check className="w-5 h-5" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      <span>
        {isGenerating ? 'Génération...' : isSuccess ? 'Téléchargé!' : 'Télécharger PDF'}
      </span>
    </button>
  );
}
