#!/usr/bin/env bash
set -e
rm -rf extensions/opera/dist/*
cp -R extensions/opera/src/* extensions/opera/dist/
# any post-copy transformation (e.g., rename manifest.json -> manifest.json)
