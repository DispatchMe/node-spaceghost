var page = require('webpage').create();
var system = require('system');

page.onConsoleMessage = function(message) {
  return console.log(message);
};

page.open(system.env.ROOT_URL);

page.onError = function(msg, trace) {
  var mochaIsRunning;
  mochaIsRunning = page.evaluate(function() {
    return window.mochaIsRunning;
  });
  if (mochaIsRunning) return;
  console.log(msg);
  trace.forEach(function(item) {
    return console.log("    " + item.file + ": " + item.line);
  });
  // XXX Need to decide if we should exit here. Sometimes there are
  // client errors but the tests still load and run fine.
  //return phantom.exit(6);
};

setInterval(function() {
  var done, failures;
  done = page.evaluate(function() {
    if (typeof TEST_STATUS !== "undefined" && TEST_STATUS !== null) {
      return TEST_STATUS.DONE;
    }
    if (typeof DONE !== "undefined" && DONE !== null) {
      return DONE;
    }
    return false;
  });
  if (done) {
    failures = page.evaluate(function() {
      if (typeof TEST_STATUS !== "undefined" && TEST_STATUS !== null) {
        return TEST_STATUS.FAILURES;
      }
      if (typeof FAILURES !== "undefined" && FAILURES !== null) {
        return FAILURES;
      }
      return false;
    });
    return phantom.exit(failures ? 2 : 0);
  }
}, 500);
