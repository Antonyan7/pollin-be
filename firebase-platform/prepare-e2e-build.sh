#!/bin/bash

# array_includes(target: String, arrayToFilter: Array)
array_includes() {
  local element="$1"
  shift
  local array=("$@")

  for item in "${array[@]}"; do
    if [ "$item" == "$element" ]; then
      return 0
    fi
  done

  return 1
}

# build location
dist_path="../dist/functions"

# remove old build & create new
rm -rf $dist_path
mkdir $dist_path
echo "✅ Old dist for functions were removed"

# firebase.json in e2e seeds repository should be aligned with this array
codebases_to_build=("results" "test-orders" "questionnaire-to-profile-info")
echo "🔧 Starting to build codebases: ${codebases_to_build[*]}"

# loop through each folder in the functions codebase dir
functions_codebase_path="./functions"
for folder in "$functions_codebase_path"/*; do 
  # create folder for dist
  codebase_name=$(basename "$folder")
  dist_folder=$dist_path/$codebase_name
  mkdir $dist_folder

  # execute build if codebase name exists in build array
  if array_includes "$codebase_name" "${codebases_to_build[@]}"; then
    # install & build packages
    install_path=./functions/$codebase_name
    echo "🗂️ Installing $codebase_name"
    cd $install_path
    yarn install
    yarn run build

    # copy all files needed for build
    copy_location="../../../dist/functions/$codebase_name/"
    cp -r ./dist $copy_location
    cp ./package.json $copy_location
    cp ./yarn.lock $copy_location 

    # return in `firebase-platform`
    cd ../../
  else
    continue
  fi
  
done

echo "✅ Every codebase is ready for E2E build"
