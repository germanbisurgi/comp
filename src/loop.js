comp.loop = function (config) {
  'use strict';
  config = config || {};
  this.delta = 0;
  this.lastTime = performance.now();
  this.fps = config.fps || 60;
  this.frame = 0;
  this.status = 'off';
  this.tasks = new comp.pool({
    class: function (fn) {
      this.execute = fn;
    },
    reset: function (object, fn) {
      object.execute = fn;
    }
  });
  this.timestep = 1000 / this.fps;
};

comp.loop.prototype.executeQueuedTasks = function () {
  var self = this;
  self.tasks.each(function (task) {
    task.execute();
    self.tasks.dismiss(task);
  });
};

comp.loop.prototype.getDelta = function () {
  return this.delta;
};

comp.loop.prototype.getFps = function () {
  return this.fps;
};

comp.loop.prototype.getFrame = function () {
  return this.frame;
};

comp.loop.prototype.getTasks = function () {
  return this.tasks;
};

comp.loop.prototype.getStatus = function () {
  return this.status;
};

comp.loop.prototype.getTimestep = function () {
  return this.timestep;
};

comp.loop.prototype.nextStep = function (task) {
  this.tasks.use(task);
};

comp.loop.prototype.reset = function () {
  this.delta = 0;
  this.lastTime = performance.now();
  this.setFps(60);
  this.frame = 0;
  this.setStatus('off');
  this.getTasks().clear();
};

comp.loop.prototype.setFps = function (fps) {
  this.fps = fps;
  this.timestep = 1000 / fps;
};

comp.loop.prototype.setStatus = function (status) {
  this.status = status;
};

comp.loop.prototype.start = function () {
  var self = this;
  this.setStatus('on');
  window.requestAnimationFrame(self.run.bind(this));
};

comp.loop.prototype.run = function (timestamp) {
  var self = this;
  self.delta += timestamp - self.lastTime;
  self.lastTime = timestamp;
  while (self.delta >= self.timestep) {
    self.frame++;
    self.step();
    self.delta -= self.timestep;
  }
  if (self.getStatus() === 'on') {
    window.requestAnimationFrame(self.run.bind(this));
  }
};

comp.loop.prototype.step = function () {
  var self = this;
  self.frame++;
  self.executeQueuedTasks();
  self.update(self.timestep);
};

comp.loop.prototype.update = function () {};