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
    main_branch=$(git branch -r | grep 'HEAD' | cut -d'/' -f3)
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [[ "$current_branch" == "$main_branch" ]]; then
        git pull --rebase --autostash
    else
        git fetch origin $main_branch:$main_branch
        git rebase $main_branch --autostash
    fi
} 

