/**
 * Serveur API pour la génération de PDF
 * Lance avec: node scripts/pdf-server.js
 */

const http = require('http');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const PDF_FILE = 'CV_Eliasy_Rakotomalalaniaina.pdf';

const server = http.createServer((req, res) => {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/generate-pdf' && req.method === 'POST') {
        console.log('📄 Génération du PDF en cours...');

        exec('npm run pdf', { cwd: path.resolve(__dirname, '..') }, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Erreur:', error.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
                return;
            }

            console.log(stdout);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, file: PDF_FILE }));
        });
    }
    else if (req.url === '/download-pdf' && req.method === 'GET') {
        const pdfPath = path.resolve(__dirname, '..', PDF_FILE);

        if (!fs.existsSync(pdfPath)) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'PDF not found. Generate it first.' }));
            return;
        }

        const stat = fs.statSync(pdfPath);
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': stat.size,
            'Content-Disposition': `attachment; filename="${PDF_FILE}"`
        });

        fs.createReadStream(pdfPath).pipe(res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Serveur PDF démarré sur http://localhost:${PORT}`);
    console.log(`   POST /generate-pdf - Génère le PDF`);
    console.log(`   GET  /download-pdf - Télécharge le PDF`);
});
