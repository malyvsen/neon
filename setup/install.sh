#!/bin/bash
echo "Installing additional programs..." &&

pamac install exa bat &&
pamac install python-pip python-poetry &&
pamac install firefox &&
pamac install telegram-desktop caprine &&
pamac install code &&

pamac install zsh && sudo chsh -s /bin/zsh $USER &&
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" &&
pamac install zsh-autosuggestions &&
pamac build spaceship-prompt
