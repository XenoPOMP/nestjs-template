#!/usr/bin/env sh

ROOT=$(pwd)
FOLDER=$ROOT/$(basename $1)

folder_size() {
  npx --yes fast-folder-size $FOLDER
}

INITIAL_SIZE=$(folder_size)

if [ ! -d "$FOLDER" ]; then
  echo "⚠️ Folder \"$FOLDER\" does not exist."
  exit 1
fi

echo "📁 Obfuscating \"$FOLDER\""

rm -rf $FOLDER/**/*.ts
echo "🗑️ Removed all TypeScript files"

echo "⬇️ Starting minify script"
if [[ "$(basename $FOLDER)" == "node_modules" ]]; then
  npx --yes modclean -n default:safe --run
else
  npx --yes minify-all-js $FOLDER --json --mangle
fi

MINIFIED_SIZE=$(folder_size)
SAVED=$(( $INITIAL_SIZE - $MINIFIED_SIZE ))

echo "📦 Saved disk size: $(npx --yes pretty-bytes-cli $SAVED)"