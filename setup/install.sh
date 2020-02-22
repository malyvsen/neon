#!/bin/bash
echo "Installing additional programs..." &&

pamac install exa bat &&
pamac install firefox &&
pamac install geary telegram-desktop caprine &&
pamac install code &&

pamac install zsh &&
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" &&
usermod --shell /bin/zsh $whoami