/**
 * Script de génération PDF avec Puppeteer
 * Approche par screenshot pour éviter les problèmes de pagination
 */

const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF(url = 'http://localhost:3000', outputFile = 'CV_Eliasy_Rakotomalalaniaina.pdf') {
    console.log(`📄 Génération du PDF depuis: ${url}`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Utiliser le mode screen (pas print)
    await page.emulateMediaType('screen');

    await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 2
    });

    await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    await page.waitForSelector('.max-w-5xl', { timeout: 10000 });

    // Nettoyer la page
    await page.evaluate(() => {
        // Supprimer le bouton
        const downloadBtn = document.querySelector('.download-pdf-btn');
        if (downloadBtn) downloadBtn.remove();

        // Nettoyer les styles externes
        const outer = document.querySelector('.min-h-screen');
        if (outer) {
            outer.style.padding = '0';
            outer.style.margin = '0';
            outer.style.background = 'white';
            outer.style.minHeight = 'auto';
        }

        const main = document.querySelector('.max-w-5xl');
        if (main) {
            main.style.maxWidth = '100%';
            main.style.margin = '0';
            main.style.boxShadow = 'none';
            main.style.borderRadius = '0';
            main.style.border = 'none';
        }

        // Réduire le padding de la grille
        const grid = document.querySelector('.p-10');
        if (grid) {
            grid.style.padding = '20px';
        }
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    const outputPath = path.resolve(process.cwd(), outputFile);

    // Générer avec preferCSSPageSize true pour ignorer @page
    await page.pdf({
        path: outputPath,
        width: '210mm',
        height: '297mm',
        printBackground: true,
        margin: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
        },
        preferCSSPageSize: true, // Utiliser les dimensions CSS
        scale: 0.48
    });

    console.log(`✅ PDF généré avec succès: ${outputPath}`);

    await browser.close();
    return outputPath;
}

const args = process.argv.slice(2);
const url = args[0] || 'http://localhost:3000';
const output = args[1] || 'CV_Eliasy_Rakotomalalaniaina.pdf';

generatePDF(url, output).catch(error => {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
});
