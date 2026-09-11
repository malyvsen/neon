#!/bin/bash
echo "Installing Homebrew packages..."
brew bundle --no-upgrade --file="$NEON_ROOT/Brewfile"
