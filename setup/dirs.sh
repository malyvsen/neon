#!/bin/bash
echo "Setting up dirs..."

function move_dir {
    local old_dir=$(xdg-user-dir "$1")
    mkdir -p "$2" &&
    if [[ -d $old_dir ]] && [[ $old_dir != "$HOME" ]] && [[ $old_dir != $2 ]]; then
        echo "Moving $old_dir to $2" &&
        rsync -a "$old_dir/" "$2/" &&
        rm -r "${old_dir:?}/"
    fi &&
    xdg-user-dirs-update --set "$1" "$2"
}

move_dir DESKTOP "${HOME}/library/desktop" &&
move_dir DOWNLOAD "${HOME}/temp" &&
move_dir TEMPLATES "${HOME}/library/templates" &&
move_dir PUBLICSHARE "${HOME}/library/public" &&
move_dir DOCUMENTS "${HOME}/org" &&
move_dir MUSIC "${HOME}/library/audio" &&
move_dir PICTURES "${HOME}/library/images" &&
move_dir VIDEOS "${HOME}/library/videos" &&
xdg-user-dirs-update