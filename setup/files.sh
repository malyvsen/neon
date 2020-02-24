#!/bin/bash
echo "Copying files..." &&
rsync -a "$(dirname $0)/files/" "$(xdg-user-dir ROOT)/"