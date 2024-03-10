#!/bin/bash
echo "Installing additional programs..." &&

pamac install base-devel eza bat firefox telegram-desktop zsh zsh-autosuggestions starship gnome-shell-extension-gsconnect &&
echo "Installed GSConnect for clipboard sharing. Enable the GNOME extension and pair manually." &&
pamac build --no-confirm visual-studio-code-bin &&

pamac install pyenv &&
eval "$(pyenv init -)" &&
pyenv install 3 &&
pyenv shell $(pyenv latest 3) &&
curl -sSL https://install.python-poetry.org | python3 - &&
curl -sSL https://pdm-project.org/install-pdm.py | python3 - &&

sudo chsh -s /bin/zsh $USER &&
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
