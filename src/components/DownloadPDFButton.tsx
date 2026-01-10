import React, { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';

export function DownloadPDFButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    setIsSuccess(false);

    try {
      // Déterminer l'URL de base (dev ou prod)
      const isLocalDev = window.location.hostname === 'localhost' && window.location.port === '5173';
      const apiBase = isLocalDev ? 'http://localhost:3001' : '';
      const generateUrl = isLocalDev ? `${apiBase}/generate-pdf` : '/api/generate-pdf';
      const downloadUrl = isLocalDev ? `${apiBase}/download-pdf` : '/api/download-pdf';

      // Générer le PDF via le serveur
      const response = await fetch(generateUrl, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erreur de génération');
      }

      // Télécharger le PDF généré
      const downloadResponse = await fetch(downloadUrl);
      const blob = await downloadResponse.blob();
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV_Eliasy_Rakotomalalaniaina.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur:', error);
      // Fallback: utiliser window.print()
      window.print();
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
