var Calc = function () {};

Calc.prototype.angleToPoint = function (origin, angle, radius) {
  return {
    x: Math.cos(angle) * radius + origin.x,
    y: Math.sin(angle) * radius + origin.y
  };
};

Calc.prototype.clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max);
};

Calc.prototype.degreesToRadians = function (degrees) {
  return degrees / 180 * Math.PI;
};

Calc.prototype.distance = function (a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
};

Calc.prototype.lerp = function (norm, min, max) {
  return (max - min) * norm + min;
};

Calc.prototype.map = function (value, sourceMin, sourceMax, destMin, destMax) {
  return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax);
};

Calc.prototype.norm = function (value, min, max) {
  return (value - min) / (max - min);
};

Calc.prototype.angleBetweenPoints = function (p1, p2) {
  var theta = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  while (theta < 0) {
    theta += Math.PI * 2;
  }
  return theta;
};

Calc.prototype.radiansToDegrees = function (radians) {
  return radians * 180 / Math.PI;
};

Calc.prototype.randomRange = function (min, max) {
  return min + Math.random() * (max - min);
};

Calc.prototype.randomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};
