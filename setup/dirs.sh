#!/bin/bash
echo "Setting up dirs..." &&
read -p "Enter root directory (to place desktop, documents etc. in): " ROOT_DIR &&
xdg-user-dirs-update --set ROOT "$ROOT_DIR" &&

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

move_dir DESKTOP "${ROOT_DIR}/library/desktop" &&
move_dir DOWNLOAD "${ROOT_DIR}/temp" &&
move_dir TEMPLATES "${ROOT_DIR}/library/templates" &&
move_dir PUBLICSHARE "${ROOT_DIR}/library/public" &&
move_dir DOCUMENTS "${ROOT_DIR}/org" &&
move_dir MUSIC "${ROOT_DIR}/library/audio/music" &&
move_dir PICTURES "${ROOT_DIR}/library/images" &&
move_dir VIDEOS "${ROOT_DIR}/library/videos" &&
xdg-user-dirs-update
