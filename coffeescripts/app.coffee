Crafty.init 960, 320
Crafty.background 'rgb(127,127,127)'
Crafty.sprite 32, "images/sprites.png",
    road: [0, 0]
    house1: [1, 0]
    house2: [1, 1]
    ball: [2, 0]
    player: [3, 0]
    enemy: [3, 0]


Crafty.c 'Enemy'
  init: ->
    @requires 'Collision, 2D, DOM, enemy'
    @dx = Math.random() * 3

    @x = 480 + (Math.random() * 480)
    @bind 'EnterFrame', ->

      @x += @dx



Crafty.c 'Controls'
  init: ->
    @requires 'Multiway, Collision, 2D, DOM'

    @bind 'Moved', (from) ->
      if this.hit('solid')
        this.attr({x: from.x, y:from.y})
      if obj = this.hit('ball')
        console.log('hit ball')

        obj[0].obj.dx += (obj[0].obj.x - @x) * 0.2
        obj[0].obj.dy += (obj[0].obj.y - @y) * 0.2
    
    @origin('top left')




  controls: (speed) ->
    console.log "controls"
    @multiway speed, {W: -90, S: 90, D: 0, A: 180}
    this

Crafty.c 'Ball'
  init: ->
    @requires '2D, DOM, Collision, ball'
    @dx = 0.0
    @dy = 0.0
    @damp = 0

    @origin('top left')
    
    @bind 'EnterFrame', ->

      if @x > 960 or @x < 0
        @x = 480
        @y = 160
        @dx = 0
        @dy = 0

      @x += @dx
      @y += @dy
      @damp += 1
      if @damp >= 20
        if Math.abs(@dx) > 0.0 or Math.abs(@dy) > 0.0
          @dx *= 0.5
          @dy *= 0.5
        
        @damp = 0

    @onHit 'solid', (objs) ->
      @dy *= -1


for i in [0..30]

  d = Math.random()
  if d < 0.2
    Crafty.e('2D, DOM, solid, house2').attr(x: i*32, y:0, z:1)
    Crafty.e('2D, DOM, solid, house1').attr(x: i*32, y:32, z:1)
  else
    Crafty.e('2D, DOM, solid, house1').attr(x: i*32, y:0, z:1)
    Crafty.e('2D, DOM, leeway, road').attr(x: i*32, y:32, z:1)


  for j in [2..7]
    Crafty.e('2D, DOM, leeway, road').attr(x: i*32, y: j*32, z:1)

  if d > 0.8
    Crafty.e('2D, DOM, solid, house2').attr(x: i*32, y:256, z:1)
    Crafty.e('2D, DOM, solid, house1').attr(x: i*32, y:288, z:1)
  else
    Crafty.e('2D, DOM, leeway, road').attr(x: i*32, y:256, z:1)
    Crafty.e('2D, DOM, solid, house1').attr(x: i*32, y:288, z:1)



player = Crafty.e('Controls, player').attr({x: 100, y: 100, z:2}).controls(2).collision(new Crafty.polygon([8,5],[16,5],[23,7],[23,29],[9,29],[9,9]))

ball = Crafty.e('Ball, ball').attr({x: 480, y:150, z:2}).collision(new Crafty.polygon([8,5],[16,5],[23,7],[23,29],[9,29],[9,9]))

for i in [2..6]
  Crafty.e('Enemy, enemy').attr({x: 480, y: i*32, z:3}).collision(new Crafty.polygon([8,5],[16,5],[23,7],[23,29],[9,29],[9,9]))

