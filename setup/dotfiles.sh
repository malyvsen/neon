#!/bin/bash
echo "Setting up dotfiles..." &&
rsync -a "$(dirname $0)/dotfiles/" "$HOME/"