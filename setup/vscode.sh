#!/bin/bash
echo "Giving user access to VS Code files..." &&

sudo chown -R :$(whoami) /usr/lib/code &&
sudo chmod g+w -R /usr/lib/code