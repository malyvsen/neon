#!/bin/bash
echo "Installing additional programs..." &&

pamac install --no-confirm base-devel eza bat pyenv firefox telegram-desktop zsh zsh-autosuggestions starship gnome-shell-extension-gsconnect docker docker-compose ttf-twemoji &&
echo "Installed GSConnect for clipboard sharing. Enable the GNOME extension and pair manually." &&
sudo systemctl enable docker.service &&
sudo usermod -aG docker $USER &&
sudo ln -sf /usr/share/fontconfig/conf.avail/75-twemoji.conf /etc/fonts/conf.d/75-twemoji.conf &&

pamac build --no-confirm visual-studio-code-bin &&

eval "$(pyenv init -)" &&
pyenv install 3 &&
pyenv shell $(pyenv latest 3) &&
curl -sSL https://install.python-poetry.org | python3 - &&
curl -sSL https://pdm-project.org/install-pdm.py | python3 - &&

curl -sS https://get.volta.sh | bash &&
source $HOME/.profile &&  # gets volta in PATH
volta install node &&
volta install pnpm &&

sudo chsh -s /bin/zsh $USER &&
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
