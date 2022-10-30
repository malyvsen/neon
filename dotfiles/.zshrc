export ZSH="/usr/share/oh-my-zsh"

ZSH_THEME="spaceship"
export SPACESHIP_PYTHON_SHOW=false
export SPACESHIP_GCLOUD_SHOW=false

# case-sensitive completion
CASE_SENSITIVE="true"

# disable auto-update checks - oh-my-zsh is managed through pacman
DISABLE_AUTO_UPDATE="true"

# command auto-correction
ENABLE_CORRECTION="true"

# change the command execution time stamp shown in the history command output
HIST_STAMPS="dd.mm.yyyy"

ZSH_CUSTOM="$HOME/.oh-my-zsh/custom/"

# I'm sorry, vim. I tried.
export EDITOR="nano"

plugins=(git z zsh-autosuggestions virtualenv ssh-agent)

ZSH_CACHE_DIR=$HOME/.cache/oh-my-zsh
if [[ ! -d $ZSH_CACHE_DIR ]]; then
  mkdir $ZSH_CACHE_DIR
fi

source $ZSH/oh-my-zsh.sh


prompt_context(){} # to hide user@machine
ZSH_AUTOSUGGEST_STRATEGY=(match_prev_cmd history completion)
ZSH_AUTOSUGGEST_COMPLETION_IGNORE="(ssh|scp|rsync|rclone) *"


# secrets! access codes etc
source $HOME/.secrets.sh

# utility scripts
source $HOME/.utils.sh

# NodeJS
[ -z "$NVM_DIR" ] && export NVM_DIR="$HOME/.nvm"
source /usr/share/nvm/nvm.sh
source /usr/share/nvm/bash_completion
source /usr/share/nvm/install-nvm-exec
export PATH="$(yarn global bin):$PATH"

# Python
eval "$(pyenv init -)"
