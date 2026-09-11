#!/bin/bash
echo "Installing Homebrew packages..."
brew bundle --no-upgrade --file="$NEON_ROOT/Brewfile"

echo "Setting up Docker Desktop..."
if [[ ! -d /Applications/Docker.app ]]; then
	if ! brew install --cask --no-upgrade docker-desktop; then
		arch=amd64
		if [[ "$(uname -m)" == arm64 ]]; then
			arch=arm64
		fi
		dmg="$(mktemp -t neon-docker).dmg"
		mount="$(mktemp -d)"
		curl -fsSL "https://desktop.docker.com/mac/main/${arch}/Docker.dmg" -o "$dmg"
		hdiutil attach -nobrowse -readonly -mountpoint "$mount" "$dmg"
		ditto "$mount/Docker.app" /Applications/Docker.app
		hdiutil detach "$mount"
		rm -f "$dmg"
		rmdir "$mount"
	fi
fi
