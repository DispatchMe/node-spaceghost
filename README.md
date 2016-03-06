# space-ghost

A lightweight CLI to run Meteor 1.3 tests. Use this if you don't want to have to open a browser tab, or if you need to run your tests in a CI build.

This is similar to [spacejam](https://www.npmjs.com/package/spacejam) and took a little bit of inspiration from `spacejam`.

## Installation

In a Meteor 1.3+ app directory:

```bash
npm i --save-dev https://github.com/DispatchMe/node-spaceghost/tarball/ec02a1830d2f44c7b218896dc8e18874fec2b386
```

## Setup

### Add mocha package with console reporter
NOTE: Currently you also have to use a custom avital:mocha package, probably just until the next Meteor 1.3 beta release:

```
"avital:mocha": {
  "git": "git@github.com:aldeed/meteor-mocha-for-1.3.git",
  "version": "a4504bdd6fa5a0ef464667298a34e57213e89437"
}
```

Install with `mgp` and `meteor add avital:mocha`.

### Define your npm test script

Basically just replace `meteor test` with `spaceghost` in an npm script. Example:

```json
{
  "scripts": {
    "test": "ENV=dev spaceghost --driver-package avital:mocha",
    "test:integration": "ENV=dev spaceghost --driver-package avital:mocha --full-app"
  }
}
```

## Run app tests

```bash
npm test
```
