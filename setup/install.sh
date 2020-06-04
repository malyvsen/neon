#!/bin/bash
echo "Installing additional programs..." &&

pamac install exa bat &&
pamac install python-pip &&
pamac install firefox &&
pamac install geary telegram-desktop caprine &&
pamac install code &&

pamac install zsh &&
pamac build oh-my-zsh-git &&
pamac install zsh-autosuggestions &&
pamac build spaceship-prompt-git