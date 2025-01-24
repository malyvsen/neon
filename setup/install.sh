#!/bin/bash
echo "Installing additional programs..." &&

# ttf-bitstream-vera is the recommended fallback for ttf-twemoji-color
pamac install --no-confirm base-devel eza bat pyenv firefox telegram-desktop zsh zsh-autosuggestions starship gnome-shell-extension-gsconnect docker docker-compose ttf-bitstream-vera &&
echo "Installed GSConnect for clipboard sharing. Enable the GNOME extension and pair manually." &&
sudo systemctl enable docker.service &&
sudo usermod -aG docker $USER &&

# get a file which pamac is sometimes blocked from retrieving
sudo curl -o /var/lib/pacman/sync/packages-meta-ext-v1.json.gz https://aur.manjaro.org/packages-meta-ext-v1.json.gz &&
pamac build --no-confirm visual-studio-code-bin ttf-twemoji-color &&
sudo ln -sf /usr/share/fontconfig/conf.avail/46-ttf-twemoji-color.conf /etc/fonts/conf.d/46-ttf-twemoji-color.conf &&

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
