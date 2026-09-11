#!/bin/bash
echo "Setting up dotfiles..."
rsync -a "$NEON_ROOT/dotfiles/" "$HOME/"
