##/bin/bash
echo "Setting up dconf..." &&
cat "$(dirname $0)/setup/dconf.txt" |
sed "s#neon.root#$(xdg-user-dir ROOT)#g" |
sed "s#neon.user#$(whoami)#g" |
dconf load /