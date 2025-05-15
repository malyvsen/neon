#!/bin/bash
echo "Installing additional programs..." &&

# ttf-bitstream-vera is the recommended fallback for ttf-twemoji-color
pamac install --no-confirm base-devel eza bat firefox telegram-desktop zsh zsh-autosuggestions starship gnome-shell-extension-gsconnect go docker docker-buildx docker-compose ttf-bitstream-vera &&
echo "Installed GSConnect for clipboard sharing. Enable the GNOME extension and pair manually." &&
sudo systemctl enable docker.service &&
sudo usermod -aG docker $USER &&

pamac build --no-confirm spotify visual-studio-code-bin ttf-twemoji-color &&
sudo ln -sf /usr/share/fontconfig/conf.avail/46-ttf-twemoji-color.conf /etc/fonts/conf.d/46-ttf-twemoji-color.conf &&

curl -LsSf https://astral.sh/uv/install.sh | sh &&

curl -sS https://get.volta.sh | bash &&
source $HOME/.profile &&  # gets volta in PATH
volta install node &&
volta install pnpm &&

sudo chsh -s /bin/zsh $USER &&
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
