#!/bin/bash
mkdir -p "$HOME/creative/software/systems" &&
cd "$HOME/creative/software/systems" &&
git clone https://github.com/malyvsen/neon.git &&
cd neon &&
source "./setup/dirs.sh" &&
source "./setup/git.sh" &&
source "./setup/pamac.sh" &&
source "./setup/fingeprint.sh" &&
source "./setup/install.sh" &&
source "./setup/ssh.sh" &&
source "./setup/dotfiles.sh"
