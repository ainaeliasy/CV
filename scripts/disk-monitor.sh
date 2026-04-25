#!/bin/bash
# Nettoyage automatique et alerte disque
# Executé toutes les 6 heures via cron
THRESHOLD=85
USAGE=$(df / --output=pcent | tail -1 | tr -d ' %')

if [ "$USAGE" -ge "$THRESHOLD" ]; then
    echo "[$(date)] ALERTE: Disque a ${USAGE}% - nettoyage auto" >> /var/log/disk-monitor.log
    # Nettoyage auto des journaux systemd
    sudo journalctl --vacuum-size=20M 2>/dev/null
    # Nettoyage apt
    sudo apt-get clean 2>/dev/null
    # Nettoyage PM2 logs
    pm2 flush 2>/dev/null
    # Nettoyage /tmp vieux de 7+ jours
    find /tmp -type f -atime +7 -delete 2>/dev/null
    NEW_USAGE=$(df / --output=pcent | tail -1 | tr -d ' %')
    echo "[$(date)] Nettoyage termine. Nouveau: ${NEW_USAGE}%" >> /var/log/disk-monitor.log
fi
