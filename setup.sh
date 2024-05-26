#!/bin/bash
mkdir "{$HOME}/creative/software/systems" &&
cd "{$HOME}/creative/software/systems" &&
git clone https://github.com/malyvsen/neon.git &&
cd neon &&
./offline_setup.sh