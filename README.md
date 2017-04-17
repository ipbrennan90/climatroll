# ClimaTroll
  This is my first real dive into [React-Native](https://facebook.github.io/react-native/). I am attempting to build a basic IoT application from which I can control my window AC unit remotely. My hope is to be able to schedule a weekly program for it as well as track the room temperatures in hopes of building an algorithm that can most efficiently use the units to cool the room to desired temperatures at desired times with little to no input. MVP is just getting the units to turn on and off remotely using the [Particle-API](https://docs.particle.io/guide/getting-started/intro/photon/)


# Hardware used
  - [Particle Photon](https://store.particle.io/products/photon) x 2

  - [Beefcake Relay](https://www.sparkfun.com/products/13815)

  - [Onewire Temperature Sensor](https://www.sparkfun.com/products/11050)

  - 4.7k resistor

# Learnings

  - Text inputs are weird, in order to center them, even if they are inside of a flex container where both alignItems and justifyContent are set to 'center' you will need to set its alignSelf property to 'center' as well

  - At the time that I built this [react-navigation](https://reactnavigation.org/), although one of, if not the most popular react-native navigation libraries, was having some issues so unless resolved I had to point to this specific commit when installing the dependency: https://github.com/react-community/react-navigation.git#7edd9a7

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
    - ios
      ```
      rm -rf ios/build
      ```





# Helpful Links

  - [Temp Sensor Wiring](http://bildr.org/2011/07/ds18b20-arduino/)
