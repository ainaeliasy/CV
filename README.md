# Emmanuëlson Eliasy Rakotomalalaniaina - Curriculum Vitae Web

Bienvenue sur le code source de mon CV en ligne professionnel !
Ce projet est une application web moderne qui présente mon parcours en tant qu'**Ingénieur Logiciel Full-Stack & Data**. Il intègre une présentation optimisée pour le web ainsi qu'un système de génération de PDF dynamique côté serveur pour l'export.

🌍 **Voir en direct :** [https://goodev.abrdns.com](https://goodev.abrdns.com)

## 🚀 Technologies Principales

- **Frontend :** React, TypeScript, Tailwind CSS, Lucide React
- **Build & Dev :** Vite
- **Backend (Export PDF) :** Node.js, Puppeteer, PM2
- **Infrastructure :** Google Cloud Platform (Compute Engine), Nginx
- **CI/CD :** GitHub Actions

## 🛠 Installation & Lancement en local

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/ainaeliasy/CV.git
   cd CV
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer le serveur de développement (Frontend) :
   ```bash
   npm run dev
   ```

4. Lancer le serveur PDF localement (optionnel, nécessite Chromium/Puppeteer) :
   ```bash
   node scripts/pdf-server.js
   ```

## 🔄 CI/CD (Déploiement Continu)

Ce projet utilise **GitHub Actions** pour le déploiement continu. Tout *push* sur la branche `master` déclenche automatiquement :
1. Le build de l'application React.
2. Le transfert des fichiers via SSH vers la VM GCP.
3. Le redémarrage du service Node.js (PM2).
4. La regénération automatique de la version PDF du CV via Puppeteer côté serveur.

## 📄 Scripts de maintenance & Infra

- `scripts/disk-monitor.sh` : Script de maintenance automatisé (via un *timer systemd*) pour surveiller l'espace disque de la VM et purger automatiquement les logs PM2 et systemd en cas de surcharge.
- `scripts/generate-pdf.js` : Utilitaire pour la génération de la version PDF "Pixel Perfect" au format A4.
- `scripts/nginx-cv.conf` : Fichier de configuration Nginx gérant le proxy inverse et la redirection SSL Let's Encrypt.

## 🤝 Contact

- **Email :** ainaeliasy1227@gmail.com
- **LinkedIn :** [Aïna Rakotomalala](https://www.linkedin.com/in/aina-rakotomalala-69070117a)
- **GitHub :** [ainaeliasy](https://github.com/ainaeliasy)
