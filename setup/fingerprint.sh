#!/bin/bash

# python-validity is required for the Carbon fingerprint sensor - USB ID 06cb:009a
# it depends on open-fprintd, which conflicts with fprintd, but open-fprintd seems to take precedence on its own, i.e.
# asking for fprintd status shows it as errored because the bus was already allocated to open-fprintd
pamac build --no-confirm python-validity &&

echo "Time to enroll your fingerprint - you'll need to touch the sensor a few times." &&
fprintd-enroll &&

PAM_CONFIG="# Try password, skippable - then fingerprint\nauth sufficient pam_unix.so try_first_pass likeauth nullok\nauth sufficient pam_fprintd.so" &&
for file in /etc/pam.d/{sudo,polkit-1}; do
    echo -e "$PAM_CONFIG\n$(cat $file)" | sudo tee $file
done &&

sudo systemctl restart polkit
