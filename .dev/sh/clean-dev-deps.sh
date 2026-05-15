#!/usr/bin/env sh

rm -rf $(find ./node_modules/@next -type d -name "swc*" -maxdepth 1 | paste -s -d ' ')
rm -rf ./node_modules/next
rm -rf ./node_modules/@img
rm -rf ./node_modules/typescript
rm -rf ./node_modules/prettier
rm -rf ./node_modules/@typescript-eslint
rm -rf ./node_modules/eslint
rm -rf ./node_modules/@eslint