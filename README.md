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

  - TouchableHighlight components cannot have multiple children, haven't looked into why this is true but there is a workaround, you can build a custom component to house the multiple children you may want to include, for me it was having text and a loader inside of the touchableHighlight. You will get an Invariant Violation error when you attempt this. You can fix this error by using setNativeProps function that comes out of the box with the React.Component class. More detailed solution [here](http://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set)

  - the particle-api-js library does not work with react-native, I had to handroll the Oauth and other flows. I will try to build out a library that works with react-native in my free time but in the meantime checkout the [api service](https://github.com/ipbrennan90/climatroll/blob/master/services/api.js)

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

# Using Realm JS

  - [Start Here](https://realm.io/docs/javascript/latest/)

  - This library gave me a lot of trouble on install for some reason, I highly recommend starting a realm branch before getting started, I installed multiple times and for some reason it kept giving me a Realm Constructor not found even though the linking was successful, started a new branch and it magically worked ¯\\_(ツ)_/¯. If it happens to you and opening a new branch doesn't work try referencing [this](https://realm.io/docs/javascript/latest/index.html#missing-realm-constructor) section of their docs.

  - when you update your realm instance's schema in development you'll most likely get a 'default.realm' already opened on current thread with different schema error. To remedy this close all processes, simulators, etc. and rebuild the project.
