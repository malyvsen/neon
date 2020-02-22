#!/bin/bash
echo "Copying files..." &&
rsync "$(dirname $0)/root/" "$(xdg-user-dir ROOT)/"