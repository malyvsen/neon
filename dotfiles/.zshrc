export ZSH="$HOME/.oh-my-zsh"

plugins=(git z zsh-autosuggestions ssh-agent)

source $ZSH/oh-my-zsh.sh
eval "$(starship init zsh)"

# uv setup
export PATH="$HOME/.local/bin:$PATH"
eval "$(uv generate-shell-completion zsh)"

# utils in rust
export PATH="$HOME/.cargo/bin:$PATH"

export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

export EDITOR="nano"

grbur () {
    : <<'DOC'
rebase branch stack onto chosen branch
DOC
    git rebase --update-refs --autostash "$1"
}

grlm () {
    : <<'DOC'
rebase branch stack onto latest main
DOC
    main_branch=$(git branch -r | grep 'HEAD' | cut -d'/' -f3)
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [[ "$current_branch" == "$main_branch" ]]; then
        git pull --rebase --autostash
    else
        git fetch origin $main_branch:$main_branch
        grbur "$main_branch"
    fi
}

gdcb () {
    : <<'DOC'
delete local branches (and their worktrees) whose PRs are closed or merged
DOC
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    main_branch=$(git branch -r | grep 'HEAD' | cut -d'/' -f3)

    local -A closed_pr_branches open_pr_branches
    local -a to_delete
    local branch worktree_path

    while IFS= read -r branch; do
        [[ -n "$branch" ]] && closed_pr_branches[$branch]=1
    done < <(gh pr list --state closed --limit 1000 --json headRefName --jq '.[].headRefName')

    while IFS= read -r branch; do
        [[ -n "$branch" ]] && open_pr_branches[$branch]=1
    done < <(gh pr list --state open --limit 1000 --json headRefName --jq '.[].headRefName')

    if [[ "$current_branch" != "$main_branch" && -n "${closed_pr_branches[$current_branch]}" && -z "${open_pr_branches[$current_branch]}" ]]; then
        echo "Current branch '$current_branch' has a closed or merged PR. Switch branches first."
        return 1
    fi

    while IFS=$'\t' read -r branch worktree_path; do
        if [[ "$branch" != "$main_branch" && -n "${closed_pr_branches[$branch]}" && -z "${open_pr_branches[$branch]}" ]]; then
            if [[ -n "$worktree_path" ]] && git worktree remove --force "$worktree_path"; then
                echo "Deleted worktree $worktree_path (was $branch)."
            fi
            to_delete+=("$branch")
        fi
    done < <(git for-each-ref --format='%(refname:short)%09%(worktreepath)' refs/heads/)

    if (( ${#to_delete[@]} == 0 )); then
        echo "No branches with closed or merged PRs to delete."
        return
    fi

    git branch -D "${to_delete[@]}"
}

mcd () {
    : <<'DOC'
make a directory and cd into it
DOC
    mkdir -p "$1"
    cd "$1"
}

# machine-specific extras
if [ -f "$HOME/.zshrc.local" ]; then
    source "$HOME/.zshrc.local"
fi
