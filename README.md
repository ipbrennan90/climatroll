# Learnings

  - Text inputs are weird, in order to center them, even if they are inside of a flex container where both alignItems and justifyContent are set to 'center' you will need to set its alignSelf property to 'cetnter as well'

# Helpful Commands

  - When you remove a dependency react-native sometimes gets confused, in order to remedy the crash a helpful group of commands is:
    - Deleting the node_modules directory and installing
      ```
      rm -rf node_modules && npm install
      ```
      or if using yarn
      ```
      rm -rf node_modules && yarn
      ```
    - Reset your package cache
      ```
      rm -rf $TMPDIR/react-*
      ```
    - Clear watchman
      ```
      watchman watch-del-all
      ```
    - Then load er' back up
      ```
      react-native run-ios
      ```
  - Sometimes when things are acting strange you can clean your builds
    - android
      ```
      rm -rf ios/build
      ```
