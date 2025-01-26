export ZSH="$HOME/.oh-my-zsh"

plugins=(git z zsh-autosuggestions ssh-agent)

source $ZSH/oh-my-zsh.sh
eval "$(starship init zsh)"

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

export PATH="$HOME/.local/bin:$PATH"

export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

export EDITOR="nano"

grlm () {
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [[ "$current_branch" == "main" ]]; then
        git pull --rebase --autostash
    else
        git fetch origin main:main
        git rebase main --autostash
    fi
} 

# I could `exec` butterfish, but that caused an i/o error with /dev/ptmx
# This also causes an error, but only when the shell exits O:)
if [[ -z "$BUTTERFISH_SHELL" ]]; then
    exec $(go env GOPATH)/bin/butterfish shell -m gpt-4o
fi
