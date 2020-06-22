#!/bin/bash
echo "Installing additional programs..." &&

pamac install exa bat &&
pamac install python-pip python-poetry &&
pamac install firefox &&
pamac install telegram-desktop caprine &&
pamac install code &&

pamac install zsh && sudo chsh -s /bin/zsh $USER &&
pamac build oh-my-zsh-git &&
pamac install zsh-autosuggestions &&
pamac build spaceship-prompt-git