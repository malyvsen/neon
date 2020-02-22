#!/bin/bash
echo "Setting up dotfiles..." &&
rsync "$(dirname $0)/dotfiles/" "$HOME/"