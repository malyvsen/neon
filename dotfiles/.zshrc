export ZSH="$HOME/.oh-my-zsh"

CASE_SENSITIVE="true"
zstyle ':omz:update' mode reminder
ENABLE_CORRECTION="true"

plugins=(git z zsh-autosuggestions ssh-agent)

source $ZSH/oh-my-zsh.sh
eval "$(starship init zsh)"

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
