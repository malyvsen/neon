#!/bin/bash
echo "Setting up Python environment..." &&

pamac install pyenv &&
pamac build pyenv-virtualenv &&
eval "$(pyenv init -)" &&
eval "$(pyenv virtualenv-init -)" &&
pyenv install 3.7.7 &&
pyenv virtualenv 3.7.7 dev &&
pyenv activate dev &&
pip install --upgrade pip &&
pip install \
tqdm \
numpy scikit-learn pandas \
tensorflow torchvision \
scikit-image opencv-python \
plotly matplotlib \
jupyter \
pylint &&
source deactivate
