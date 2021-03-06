var KeysSystem = function () {
  this.keys = {};
  document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
};

KeysSystem.prototype.add = function (key, preventDefault) {
  this.keys[key] = new naive.Key(key, preventDefault);
  return this.keys[key];
};

KeysSystem.prototype.handleKeyDown = function (event) {
  if (typeof this.keys[event.key] !== 'undefined') {
    this.keys[event.key].hold = true;
    if (this.keys[event.key].preventDefault) {
      event.preventDefault();
    }
  }
};

KeysSystem.prototype.handleKeyUp = function (event) {
  if (typeof this.keys[event.key] !== 'undefined') {
    this.keys[event.key].hold = false;
    if (this.keys[event.key].preventDefault) {
      event.preventDefault();
    }
  }
};

KeysSystem.prototype.update = function (delta, frame) {
  for (var i in this.keys) {
    if (!this.keys.hasOwnProperty(i)) {
      continue;
    }
    if (this.keys[i].hold) {
      this.keys[i].holdTime += delta;
      this.keys[i].endFrame = 0;
      if (this.keys[i].startFrame === 0) {
        this.keys[i].startFrame = frame;
      }
    } else {
      this.keys[i].holdTime = 0;
      this.keys[i].startFrame = 0;
      if (this.keys[i].endFrame === 0) {
        this.keys[i].endFrame = frame;
      }
    }
    this.keys[i].start = (this.keys[i].startFrame === frame);
    this.keys[i].end = (this.keys[i].endFrame === frame);
  }
};
