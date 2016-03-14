#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd dist/

git init
git config user.name "Ell"
git config user.email "alan@cattes.us"

git remote add upstream "https://$GH_TOKEN@github.com/ell/grid.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild app @ ${rev}"
git push -q upstream HEAD:gh-pages
