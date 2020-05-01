#!/bin/bash
echo "Installing Python packages for AI..." &&

pamac install pyenv &&
pamac build pyenv-virtualenv &&
eval "$(pyenv init -)" &&
eval "$(pyenv virtualenv-init -)" &&
pyenv install 3.7.7 &&
pyenv virtualenv 3.7.7 ai &&
pyenv activate ai &&
pip install --upgrade pip &&
pip install tensorflow torchvision &&
pip install numpy scikit-learn scikit-image pandas tqdm &&
pip install plotly &&
pip install jupyter &&
pip install pylint &&
source deactivate