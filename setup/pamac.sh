#!/bin/bash
echo "Making pamac able to install AUR packages..." &&

# pamac is sometimes blocked from retrieving this file because the Arch devs decided it was spamming too hard
sudo curl -o /var/lib/pacman/sync/packages-meta-ext-v1.json.gz https://aur.manjaro.org/packages-meta-ext-v1.json.gz