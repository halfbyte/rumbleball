(function() {
  var ball, d, i, j, player;
  Crafty.init(960, 320);
  Crafty.background('rgb(127,127,127)');
  Crafty.sprite(32, "images/sprites.png", {
    road: [0, 0],
    house1: [1, 0],
    house2: [1, 1],
    ball: [2, 0],
    player: [3, 0],
    enemy: [3, 0]
  });
  Crafty.c('Enemy', {
    init: function() {
      this.requires('Collision, 2D, DOM, enemy');
      this.dx = Math.random() * 3;
      this.x = 480 + (Math.random() * 480);
      return this.bind('EnterFrame', function() {
        return this.x += this.dx;
      });
    }
  });
  Crafty.c('Controls', {
    init: function() {
      this.requires('Multiway, Collision, 2D, DOM');
      this.bind('Moved', function(from) {
        var obj;
        if (this.hit('solid')) {
          this.attr({
            x: from.x,
            y: from.y
          });
        }
        if (obj = this.hit('ball')) {
          console.log('hit ball');
          obj[0].obj.dx += (obj[0].obj.x - this.x) * 0.2;
          return obj[0].obj.dy += (obj[0].obj.y - this.y) * 0.2;
        }
      });
      return this.origin('top left');
    },
    controls: function(speed) {
      console.log("controls");
      this.multiway(speed, {
        W: -90,
        S: 90,
        D: 0,
        A: 180
      });
      return this;
    }
  });
  Crafty.c('Ball', {
    init: function() {
      this.requires('2D, DOM, Collision, ball');
      this.dx = 0.0;
      this.dy = 0.0;
      this.damp = 0;
      this.origin('top left');
      this.bind('EnterFrame', function() {
        if (this.x > 960 || this.x < 0) {
          this.x = 480;
          this.y = 160;
          this.dx = 0;
          this.dy = 0;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.damp += 1;
        if (this.damp >= 20) {
          if (Math.abs(this.dx) > 0.0 || Math.abs(this.dy) > 0.0) {
            this.dx *= 0.5;
            this.dy *= 0.5;
          }
          return this.damp = 0;
        }
      });
      return this.onHit('solid', function(objs) {
        return this.dy *= -1;
      });
    }
  });
  for (i = 0; i <= 30; i++) {
    d = Math.random();
    if (d < 0.2) {
      Crafty.e('2D, DOM, solid, house2').attr({
        x: i * 32,
        y: 0,
        z: 1
      });
      Crafty.e('2D, DOM, solid, house1').attr({
        x: i * 32,
        y: 32,
        z: 1
      });
    } else {
      Crafty.e('2D, DOM, solid, house1').attr({
        x: i * 32,
        y: 0,
        z: 1
      });
      Crafty.e('2D, DOM, leeway, road').attr({
        x: i * 32,
        y: 32,
        z: 1
      });
    }
    for (j = 2; j <= 7; j++) {
      Crafty.e('2D, DOM, leeway, road').attr({
        x: i * 32,
        y: j * 32,
        z: 1
      });
    }
    if (d > 0.8) {
      Crafty.e('2D, DOM, solid, house2').attr({
        x: i * 32,
        y: 256,
        z: 1
      });
      Crafty.e('2D, DOM, solid, house1').attr({
        x: i * 32,
        y: 288,
        z: 1
      });
    } else {
      Crafty.e('2D, DOM, leeway, road').attr({
        x: i * 32,
        y: 256,
        z: 1
      });
      Crafty.e('2D, DOM, solid, house1').attr({
        x: i * 32,
        y: 288,
        z: 1
      });
    }
  }
  player = Crafty.e('Controls, player').attr({
    x: 100,
    y: 100,
    z: 2
  }).controls(2).collision(new Crafty.polygon([8, 5], [16, 5], [23, 7], [23, 29], [9, 29], [9, 9]));
  ball = Crafty.e('Ball, ball').attr({
    x: 480,
    y: 150,
    z: 2
  }).collision(new Crafty.polygon([8, 5], [16, 5], [23, 7], [23, 29], [9, 29], [9, 9]));
  for (i = 2; i <= 6; i++) {
    Crafty.e('Enemy, enemy').attr({
      x: 480,
      y: i * 32,
      z: 3
    }).collision(new Crafty.polygon([8, 5], [16, 5], [23, 7], [23, 29], [9, 29], [9, 9]));
  }
}).call(this);
