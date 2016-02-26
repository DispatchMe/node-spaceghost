# space-ghost

A lightweight CLI to run Meteor 1.3 tests. Use this if you don't want to have to open a browser tab, or if you need to run your tests in a CI build.

This is similar to [spacejam](https://www.npmjs.com/package/spacejam) and took a little bit of inspiration from `spacejam`.

## Installation

In a Meteor 1.3+ app directory:

```bash
npm i --save-dev space-ghost
```

## Usage

Basically just replace `meteor test-app` with `space-ghost` in an npm script. Example:

```json
{
  "scripts": {
    "test": "ENV=dev spaceghost --unit"
  }
}
```

And then run them with: `npm test`

NOTE: Currently you also have to use a custom avital:mocha package, probably just until the next Meteor 1.3 beta release:

```
"avital:mocha": {
  "git": "git@github.com:aldeed/meteor-mocha-for-1.3.git",
  "version": "365f3f36c1cfab9b81f6838a4ed776d5a112afc8"
}
```

Install with `mgp` and `meteor add avital:mocha`.
