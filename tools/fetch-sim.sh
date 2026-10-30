#!/usr/bin/env bash
# Puts the Unity module build of the simulation into frontend/public/sim/, where ng serve and
# ng build pick it up (angular.json assets → <base>/sim/). Used locally and by the deploy workflow.
#
#   tools/fetch-sim.sh                    the release pinned in sim.version (skipped if already there)
#   tools/fetch-sim.sh path/to/build.zip  a local zip, e.g. to try a new build before releasing it
#
# The zip is Builds/ModuleWeb/ of ../ilias-precession-simulation, packed by its
# Tools/package-module-build.sh and attached as ModuleWeb.zip to a release of that repo.
set -euo pipefail

# a relative zip path is meant from where it was typed (npm runs scripts in frontend/, INIT_CWD is the caller's folder)
ZIP=${1:-}
if [ -n "$ZIP" ] && [ "${ZIP#/}" = "$ZIP" ]; then ZIP="${INIT_CWD:-$PWD}/$ZIP"; fi

cd "$(dirname "$0")/.."
REPO=CVC97/Ilias-Precession-Module-Simulation
DEST=frontend/public/sim
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

if [ -n "$ZIP" ]; then
    cp "$ZIP" "$TMP/ModuleWeb.zip"
    VERSION="local: $(basename "$ZIP"), $(date '+%Y-%m-%d %H:%M')"
else
    VERSION=$(tr -d '[:space:]' < sim.version)
    if [ "$(cat "$DEST/sim-version.txt" 2>/dev/null)" = "$VERSION" ]; then
        echo "Simulation $VERSION is already in $DEST."
        exit 0
    fi
    echo "Downloading simulation $VERSION …"
    curl -fL --retry 3 -o "$TMP/ModuleWeb.zip" "https://github.com/$REPO/releases/download/$VERSION/ModuleWeb.zip"
fi

unzip -q "$TMP/ModuleWeb.zip" -d "$TMP/unpacked"
# the build's folder: where Build/ModuleWeb.loader.js is (zip with or without a top folder)
LOADER=$(find "$TMP/unpacked" -path '*/Build/ModuleWeb.loader.js' | head -n 1)
if [ -z "$LOADER" ]; then
    echo "No Build/ModuleWeb.loader.js in the zip: not a module build." >&2
    exit 1
fi
SRC=$(dirname "$(dirname "$LOADER")")

rm -rf "$DEST"
mkdir -p "$DEST"
cp -r "$SRC"/. "$DEST"/
echo "$VERSION" > "$DEST/sim-version.txt"           # also deployed: shows which build is live
echo "Simulation $VERSION → $DEST"
