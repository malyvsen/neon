#!/bin/bash
echo "Installing Homebrew packages..."
brew bundle --file="$NEON_ROOT/Brewfile"
