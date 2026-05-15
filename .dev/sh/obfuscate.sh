#!/usr/bin/env bash

ROOT=$(pwd)
FOLDER=$ROOT/$(basename $1)

if [ ! -d "$FOLDER" ]; then
  echo "⚠️ Folder \"$FOLDER\" does not exist."
  exit 1
fi

echo "📁 Obfuscating \"$FOLDER\""

rm -rf $FOLDER/**/*.ts
echo "🗑️ Removed all TypeScript files"

echo "⬇️ Starting minify script"
npx --yes minify-all dist