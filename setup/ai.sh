#!/bin/bash
echo "Installing Python packages for AI..." &&

pamac install pyenv pyenv-virtualenv &&
eval "$(pyenv init -)" &&
eval "$(pyenv virtualenv-init -)" &&
pyenv virtualenv 3.7.6 ai &&
pyenv activate ai &&
pip install tensorflow torchvision &&
pip install numpy scikit-learn scikit-image pandas tqdm &&
source deactivate