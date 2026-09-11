#!/bin/bash
echo "Setting up SSH..."

key="$HOME/.ssh/id_ed25519"
if [[ ! -f "$key" ]]; then
	mkdir -p "$HOME/.ssh"
	chmod 700 "$HOME/.ssh"
	ssh-keygen -t ed25519 -C "5940672+malyvsen@users.noreply.github.com" -f "$key" -N ""
fi

echo "SSH public key:"
cat "$key.pub"
