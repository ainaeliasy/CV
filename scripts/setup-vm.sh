#!/bin/bash
#
# Script d'installation automatique pour CV sur GCP VM
# Usage: bash setup-vm.sh
#

set -e

echo "=========================================="
echo "  Installation CV - GCP VM Setup Script"
echo "=========================================="

# Variables
APP_DIR="/var/www/cv"
GITHUB_REPO="https://github.com/ainaeliasy/CV.git"
NODE_VERSION="20"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[✓]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# 1. Mise à jour du système
echo ""
echo "1. Mise à jour du système..."
sudo apt-get update && sudo apt-get upgrade -y
log "Système mis à jour"

# 2. Installation de Node.js
echo ""
echo "2. Installation de Node.js ${NODE_VERSION}..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs
log "Node.js $(node -v) installé"

# 3. Installation des dépendances pour Puppeteer/Chromium
echo ""
echo "3. Installation de Chromium et dépendances..."
sudo apt-get install -y \
    chromium \
    fonts-liberation \
    fonts-noto-color-emoji \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends
log "Chromium installé"

# 4. Installation de Nginx
echo ""
echo "4. Installation de Nginx..."
sudo apt-get install -y nginx
sudo systemctl enable nginx
log "Nginx installé"

# 5. Installation de PM2
echo ""
echo "5. Installation de PM2..."
sudo npm install -g pm2
log "PM2 installé"

# 6. Création du répertoire de l'application
echo ""
echo "6. Configuration du répertoire de l'application..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR
log "Répertoire $APP_DIR créé"

# 7. Instructions pour copier les fichiers
echo ""
echo "=========================================="
echo "  ÉTAPE MANUELLE REQUISE"
echo "=========================================="
echo ""
warn "Copiez vos fichiers du projet dans: $APP_DIR"
echo ""
echo "Option A - Depuis votre PC Windows (avec SCP):"
echo "  scp -r d:/TRAVAIL/CV/* username@VM_IP:$APP_DIR/"
echo ""
echo "Option B - Cloner depuis Git:"
echo "  cd $APP_DIR && git clone $GITHUB_REPO ."
echo ""
echo "Option C - Upload manuel via SSH/SFTP"
echo ""
echo "Appuyez sur Entrée une fois les fichiers copiés..."
read -p ""

# 8. Installation des dépendances Node.js
echo ""
echo "8. Installation des dépendances Node.js..."
cd $APP_DIR
npm install
log "Dépendances installées"

# 9. Build du frontend
echo ""
echo "9. Build du projet..."
npm run build
log "Build terminé"

# 10. Configuration de Puppeteer
echo ""
echo "10. Configuration de Puppeteer..."
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Modifier le script generate-pdf.js pour utiliser le bon chemin Chromium
sed -i "s|headless: 'new'|headless: 'new', executablePath: '/usr/bin/chromium'|g" $APP_DIR/scripts/generate-pdf.js
log "Puppeteer configuré"

# 11. Créer le serveur de production
echo ""
echo "11. Création du serveur de production..."
cat > $APP_DIR/scripts/production-server.js << 'EOF'
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '..', 'build');
const PDF_FILE = 'CV_Eliasy_Rakotomalalaniaina.pdf';

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API endpoints
    if (req.url === '/api/generate-pdf' && req.method === 'POST') {
        console.log('📄 Génération du PDF...');
        exec('npm run pdf', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
            if (error) {
                console.error('Erreur:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
                return;
            }
            console.log('✅ PDF généré');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
        return;
    }

    if (req.url === '/api/download-pdf' && req.method === 'GET') {
        const pdfPath = path.join(__dirname, '..', PDF_FILE);
        if (!fs.existsSync(pdfPath)) {
            res.writeHead(404);
            res.end('PDF not found');
            return;
        }
        const stat = fs.statSync(pdfPath);
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': stat.size,
            'Content-Disposition': `attachment; filename="${PDF_FILE}"`
        });
        fs.createReadStream(pdfPath).pipe(res);
        return;
    }

    // Serve static files
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Serveur CV démarré sur http://localhost:${PORT}`);
});
EOF
log "Serveur de production créé"

# 12. Configuration Nginx
echo ""
echo "12. Configuration de Nginx..."
sudo tee /etc/nginx/sites-available/cv << EOF
server {
    listen 80;
    server_name goodev.abrdns.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/cv /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
log "Nginx configuré"

# 13. Démarrer l'application avec PM2
echo ""
echo "13. Démarrage de l'application..."
cd $APP_DIR
pm2 start scripts/production-server.js --name "cv-server"
pm2 save
pm2 startup systemd -u $USER --hp /home/$USER
log "Application démarrée avec PM2"

# 14. Ouvrir le port 80 dans le firewall
echo ""
echo "14. Configuration du firewall..."
sudo ufw allow 'Nginx Full' 2>/dev/null || true
log "Firewall configuré"

# Terminé
echo ""
echo "=========================================="
echo "  INSTALLATION TERMINÉE ! 🎉"
echo "=========================================="
echo ""
echo "Votre CV est accessible à:"
echo "  http://$(curl -s ifconfig.me)"
echo ""
echo "Commandes utiles:"
echo "  pm2 status          - Voir le statut"
echo "  pm2 logs cv-server  - Voir les logs"
echo "  pm2 restart all     - Redémarrer"
echo ""
