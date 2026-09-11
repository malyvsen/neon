#!/bin/bash
echo "Setting up toolchains..."

if [[ ! -d "$HOME/.cargo" ]]; then
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --no-modify-path
fi

volta install node
volta install pnpm

if [[ ! -d "$HOME/.oh-my-zsh" ]]; then
	RUNZSH=no CHSH=no sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
fi

if [[ "$SHELL" != *zsh ]]; then
	chsh -s /bin/zsh
fi
