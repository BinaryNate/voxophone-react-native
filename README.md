<p align="center">
    <img alt="logo" src="https://github.com/BinaryNate/voxophone/blob/master/docs/logo.png?raw=true" width="400">
</p>

Voxophone is a mobile app which turns your singing or humming into realistic instrument sounds, like a keyboard that you play with your voice instead of your fingers.

Voxophone is [available for free from the Apple App Store](https://itunes.apple.com/us/app/voxophone/id1224464977?mt=8) and will be coming soon to the Google Play store, too.

<p align="center">
    <img alt="demo" src="https://raw.githubusercontent.com/BinaryNate/voxophone/master/docs/demo.gif" width="375">
</p>

## Code

The version of the app that is currently in the App Store was developed with [NativeScript](https://docs.nativescript.org/), a framework for developing native, cross-platform mobile apps using JavaScript, CSS, and XML. The code in this repository is a port of that code to React-Native, which is a similar cross-platform framework. The purpose of this port was to evaluate React-Native and compare the two frameworks. With a few exceptions, this version has reached feature parity with the [original NativeScript version](https://github.com/BinaryNate/voxophone).

While this repo contains Voxophone's user interface, it does not include its proprietary audio engine, which is required to be able to build and run the app. So, this code is provided for informational purposes, but cannot be built as-is.
