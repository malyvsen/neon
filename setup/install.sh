#!/bin/bash
echo "Installing additional programs..." &&

pamac install base-devel &&
pamac install exa bat &&
pamac install firefox &&
pamac install telegram-desktop &&
pamac build visual-studio-code-bin &&

pamac install pyenv &&
pyenv install 3 &&
pyenv shell $(pyenv latest 3) &&
curl -sSL https://install.python-poetry.org | python3 - &&

pamac install zsh && sudo chsh -s /bin/zsh $USER &&
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" &&
pamac install zsh-autosuggestions &&
pamac build spaceship-prompt
