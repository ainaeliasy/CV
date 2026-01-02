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

        // Les styles de padding sont gérés par les composants React

        // Injecter du CSS pour éviter les coupures de contenu
        const style = document.createElement('style');
        style.textContent = `
            /* Éviter les coupures dans les cartes d'expérience et formation */
            .rounded-xl, .rounded-lg, .bg-slate-50, .border-l-4 {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            
            /* Les sections avec border-l (timeline) */
            .border-l-4 > div, .space-y-8 > div, .space-y-6 > div {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            
            /* Titres restent avec leur contenu */
            h2, h3, h4 {
                page-break-after: avoid !important;
                break-after: avoid !important;
            }
            
            /* Éviter orphelines/veuves */
            p, li {
                orphans: 3;
                widows: 3;
            }
            
            /* Première page sans marge en haut */
            @page :first {
                margin-top: 0 !important;
            }
            
            /* Pages suivantes avec marge en haut */
            @page {
                margin-top: 10mm;
                margin-bottom: 10mm;
            }
        `;
        document.head.appendChild(style);
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
            bottom: '10mm',
            left: '0'
        },
        preferCSSPageSize: true,
        scale: 0.55
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
