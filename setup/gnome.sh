#!/bin/bash
echo "Customizing GNOME..." &&

gsettings set org.gnome.desktop.wm.preferences focus-mode 'mouse' &&
gsettings set org.gnome.desktop.interface enable-hot-corners false &&
gsettings set org.gnome.mutter workspaces-only-on-primary false &&
gsettings set org.gnome.shell.app-switcher current-workspace-only true
