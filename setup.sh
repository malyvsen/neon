#!/bin/bash
mkdir -p "$HOME/creative/software/systems" &&
cd "$HOME/creative/software/systems" &&
git clone https://github.com/malyvsen/neon.git &&
cd neon &&
source "$(dirname $0)/setup/dirs.sh" &&
source "$(dirname $0)/setup/git.sh" &&
source "$(dirname $0)/setup/fingeprint.sh" &&
source "$(dirname $0)/setup/install.sh" &&
source "$(dirname $0)/setup/ssh.sh" &&
source "$(dirname $0)/setup/dotfiles.sh"
