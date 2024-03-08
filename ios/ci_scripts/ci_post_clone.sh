#!/bin/sh

# Install Node, CocoaPods, and yarn using Homebrew.
brew install node
brew install cocoapods

# Install dependencies
pod install
