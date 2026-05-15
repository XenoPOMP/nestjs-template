#!/usr/bin/env bash

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
npx --yes minify-all-js dist --json --mangle

MINIFIED_SIZE=$(folder_size)

echo "Size $INITIAL_SIZE -> $MINIFIED_SIZE"