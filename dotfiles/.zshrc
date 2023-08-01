export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="spaceship"
CASE_SENSITIVE="true"
zstyle ':omz:update' mode reminder
ENABLE_CORRECTION="true"

plugins=(git z zsh-autosuggestions virtualenv ssh-agent)

source $ZSH/oh-my-zsh.sh

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
