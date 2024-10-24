#!/usr/bin/env bash

cp compatibility/manifest-firefox.json dist
# shellcheck disable=SC2164
cd dist

jq "del(.background)" manifest.json > manifest-temp.json
jq -s '.[0] * .[1]' manifest-temp.json manifest-firefox.json > manifest.json
rm manifest-*.json

# shellcheck disable=SC2103
cd ..
