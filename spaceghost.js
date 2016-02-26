#!/usr/bin/env node

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');

var meteorProcess = childProcess.spawn('meteor', [
  'test-app'
].concat(process.argv.slice(2)), {
  env: process.env
});

meteorProcess.on('error', function (error) {
  throw error;
});

meteorProcess.stdout.on('data', function(data) {
  data = data.toString();
  console.log(data);

  if (data.indexOf('App running at:') > -1) {
    console.log('App finished loading. Running test suite now.');
    startPhantom();
  }
});

meteorProcess.stderr.on('data', function(data) {
  console.error(data.toString());
});

function startPhantom() {
  var phantomProcess = childProcess.execFile(phantomjs.path, [
    path.join(__dirname, 'phantomjs-script.js')
  ], {
    env: {
      ROOT_URL: process.env.ROOT_URL || 'http://127.0.0.1:3000',
      stdio: 'inherit'
    }
  });

  phantomProcess.on('error', function (error) {
    throw error;
  });

  phantomProcess.on('close', function () {
    meteorProcess.kill();
  });

  phantomProcess.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  phantomProcess.stderr.on('data', function(data) {
    console.error(data.toString());
  });
}
