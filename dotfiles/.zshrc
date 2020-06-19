# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

export ZSH="/usr/share/oh-my-zsh"

ZSH_THEME="spaceship"

# case-sensitive completion
CASE_SENSITIVE="true"

# disable auto-update checks - oh-my-zsh is managed through pacman
DISABLE_AUTO_UPDATE="true"

# command auto-correction
ENABLE_CORRECTION="true"

# change the command execution time stamp shown in the history command output
HIST_STAMPS="dd.mm.yyyy"

ZSH_CUSTOM="$HOME/.oh-my-zsh/custom/"

plugins=(git z zsh-autosuggestions virtualenv)

ZSH_CACHE_DIR=$HOME/.cache/oh-my-zsh
if [[ ! -d $ZSH_CACHE_DIR ]]; then
  mkdir $ZSH_CACHE_DIR
fi

source $ZSH/oh-my-zsh.sh


prompt_context(){} # to hide user@machine
ZSH_AUTOSUGGEST_STRATEGY=(match_prev_cmd history completion)