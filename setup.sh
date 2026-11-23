#!/bin/bash
set -euo pipefail

ensure_brew() {
	if [[ ! -x /opt/homebrew/bin/brew && ! -x /usr/local/bin/brew ]]; then
		echo "Installing Homebrew..."
		/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	fi
	if [[ -x /opt/homebrew/bin/brew ]]; then
		eval "$(/opt/homebrew/bin/brew shellenv)"
	elif [[ -x /usr/local/bin/brew ]]; then
		eval "$(/usr/local/bin/brew shellenv)"
	fi
}

ensure_repo() {
	local dest="$HOME/Documents/Code/neon"
	local here
	here="$(cd "$(dirname "${BASH_SOURCE[0]:-}")" && pwd)"
	if [[ -f "$here/setup.sh" && -d "$here/setup" ]]; then
		git -C "$here" pull --rebase --autostash >&2
		echo "$here"
		return
	fi
	if [[ -d "$dest/.git" ]]; then
		git -C "$dest" pull --rebase --autostash >&2
		echo "$dest"
		return
	fi
	echo "Cloning neon..." >&2
	mkdir -p "$(dirname "$dest")"
	git clone https://github.com/malyvsen/neon.git "$dest" >&2
	echo "$dest"
}

ensure_brew
export NEON_ROOT
NEON_ROOT="$(ensure_repo)"
cd "$NEON_ROOT"

source "$NEON_ROOT/setup/brew.sh"
source "$NEON_ROOT/setup/dotfiles.sh"
source "$NEON_ROOT/setup/toolchains.sh"
source "$NEON_ROOT/setup/ssh.sh"
source "$NEON_ROOT/setup/gh.sh"
