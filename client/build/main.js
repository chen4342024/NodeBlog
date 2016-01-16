"use strict";
var fs = require("fs");

function registerTasks(folder) {
  var task = fs.readdirSync(__dirname + folder);
  task.forEach(function (task) {
    if (task.substring(task.lastIndexOf(".")) == ".js") {
      require(__dirname + folder + task);
    }
  });
}


registerTasks('/config/');
registerTasks('/tasks/');
