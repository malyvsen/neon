#!/bin/bash
echo "Installing additional programs..." &&

pamac install exa bat &&
pamac install python-pip &&
pamac install firefox &&
pamac install geary telegram-desktop caprine &&
pamac install code &&

pamac install zsh zsh-autosuggestions &&
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" &&
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions