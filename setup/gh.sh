#!/bin/bash
echo "Installing gh-stack..."

gh extension install github/gh-stack --force
gh skill install github/gh-stack gh-stack --dir "$HOME/.agents/skills" --force
