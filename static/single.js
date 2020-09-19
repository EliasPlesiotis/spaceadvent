let bg;
let b;
let r;
let s;
let exp;
let st;
let bl;
let bu;
let div;
let canvas;
let player;
let bullets = [];
let holes = [];
let rocks = [];
let stars = [];
let players = [];
let enbull = [];
let explodes = [];
let score;
let phone;

function preload() {
    bg = loadImage('static/assets/space.png')
    b = loadImage('static/assets/bullets.png')
    r = loadImage('static/assets/rock.png')
    s = loadImage('static/assets/ufo2.png')
    st = loadImage('static/assets/star.png')
    bu = loadImage('static/assets/bullet.png')
    t = loadImage('https://cdn.glitch.com/cdfc8e42-3e00-4367-8e3b-0c51c1e71f51%2FFrame%205.png?v=1575549185221')
    exp = loadImage('https://cdn.glitch.com/cdfc8e42-3e00-4367-8e3b-0c51c1e71f51%2FUntitled.png?v=1575549081594')
    bl = loadImage('https://cdn.glitch.com/cdfc8e42-3e00-4367-8e3b-0c51c1e71f51%2FFrame%201.png?v=1575157444051')
}

function setup() {
    score = 0
    phone = 'ontouchstart' in window
    div = createDiv()
    canvas = createCanvas(1200, 600)
    frameRate(50)
    div.child(canvas)

    div.style('width', '100vw')
    div.style('height', '100vh')

    canvas.style('width', '100%')
    canvas.style('height', '100%')
    
    for ( let i = 0; i < 20; i++ ) {
      stars[i] = new Star(random(4700), random(2300))
    }
    
    for ( let i = 0; i < 200; i++ ) {
      rocks[i] = new Rock(random(4700), random(2300), random() < 0.4)
    }
   
    for ( let i = 0; i < 10; i++ ) {
      players[i] = new Tower(random(4700), random(2300))
    }
  
    player = new Player(random((width*4)-2*width), random((height*4)-2*height))
    
    for ( let i = 0; i < 200; i++ ) {
      if ( dist(player.pos.x, player.pos.y, rocks[i].pos.x, rocks[i].pos.y) < 500 ) {
        rocks[i].pos.add(1000)
      }
    }
  
    for ( let i = 0; i < 10; i++ ) {
      if ( dist(player.pos.x, player.pos.y, players[i].pos.x, players[i].pos.y) < 500 ) {
        players[i].pos.add(1000)
      }
    }
    
  
}


function keyTyped() {
  if ( key === ' ' && !player.dest ) {
        //bullets.push(new Bullet(createVector(player.pos.x, player.pos.y)))
    }

}

function mouseClicked() {
  if ( player.ammo >= 1 && !player.dest && !phone && !player.shield ) {
    bullets.push(new Bullet(createVector(player.pos.x, player.pos.y)))
    player.ammo -= 1
  }
 
}


function doubleClicked() {
  if ( player.ammo >= 1 && !player.dest && phone) {
    bullets.push(new Bullet(createVector(player.pos.x, player.pos.y)))
    player.ammo -= 1
  }
 
}

function draw() {
    background(bg)

    fill(255)
    
    textSize(20)
    textFont('Arial')
    text('Ammo: '+ player.ammo, 30, 50)
    text('Score: '+ score, 30, 70)
    text('Power: '+ player.power, 30, 90)
  
  
    translate(width/2 - player.pos.x, height/2 - player.pos.y)

    rect(-25, -25, 4850, 5)
    rect(-25, -25, 5, 2450)
    rect(4825, -25, 5, 2455)
    rect(-25, 2425, 4850, 5)
    
    player.update()
    player.show()

    player.shield = false
    if (keyIsDown(32) && player.power > 0 ) {
        player.shield = true
    }
  
    for ( let i = 0; i < rocks.length; i++ ) {
        rocks[i].show()
        rocks[i].update()
        
        if (dist(rocks[i].pos.x, rocks[i].pos.y, player.pos.x, player.pos.y) < width/2) {
            if (dist(rocks[i].pos.x, rocks[i].pos.y, player.pos.x, player.pos.y) < 80/2 && rocks[i].r < 50 ) {
                rocks.splice(i, 1)
                player.ammo++
                rocks.push(new Rock(random(4700), random(2300), random() < 0.4))
           }

            if (dist(player.pos.x, player.pos.y, rocks[i].pos.x, rocks[i].pos.y) < 80 && rocks[i].r > 50 ) {
                if ( !player.dest ) {
                  explodes.push(new Explode(player.pos.x, player.pos.y))
                  player.dest = true
                  setTimeout( () => location.replace("https://spaceadvent.glitch.me/lose"), 1500)
                }
            }

            if ( rocks[i].r > 50 && bullets != null) {
                for ( let j = 0; j < bullets.length; j++ ) {
                    if (dist(bullets[j].pos.x, bullets[j].pos.y, rocks[i].pos.x, rocks[i].pos.y) < 55) {
                        bullets.splice(j, 1)
                        explodes.push(new Explode(rocks[i].pos.x, rocks[i].pos.y))
                        rocks.splice(i, 1)
                        rocks.push(new Rock(random(4700), random(2300), random() < 0.4))
                        score += 10
                    }
                }
                
                for ( let j = 0; j < enbull.length; j++ ) {
                    if (dist(enbull[j].pos.x, enbull[j].pos.y, rocks[i].pos.x, rocks[i].pos.y) < 55 && !player.shield ) {
                        enbull.splice(j, 1)
                    }
                }
                
            }
        }
    }

    if (bullets != null) {
        for ( let i = 0; i < bullets.length; i++ ) {
            bullets[i].show()
            bullets[i].update()
            if (bullets[i].life == 0) {
                bullets.splice(i, 1)
            }
        }
    }

    for ( let i = 0; i < players.length; i++ ) {
        players[i].update()
        players[i].show()
        for ( let j  = 0; j < bullets.length; j++ ) {
          if ( dist(bullets[j].pos.x, bullets[j].pos.y, players[i].pos.x, players[i].pos.y) < 50 ) {
            explodes.push(new Explode(players[i].pos.x, players[i].pos.y))
            players[i].pos = createVector(random(4700), random(2300))
            bullets.splice(j, 1)
            score += 45
          } 
        }
    }

    for ( let i = 0; i < enbull.length; i++ ) {
        enbull[i].update()
        enbull[i].show()
        if (dist(enbull[i].pos.x, enbull[i].pos.y, player.pos.x, player.pos.y) < 60/2 && !player.shield ) {
          if ( !player.dest ) {
            explodes.push(new Explode(player.pos.x, player.pos.y))
            player.dest = true
            setTimeout(() => location.replace("https://spaceadvent.glitch.me/lose"), 1000)
          }
          enbull.splice(i, 1)
          continue
        }
        if (enbull[i].life == 0) {
          enbull.splice(i, 1)
        }
 
    }

    for ( let i = 0; i < stars.length; i++ ) {
        stars[i].show()
        stars[i].update()
    }
  
    for ( let i = 0; i < explodes.length; i++ ) {
      explodes[i].update()
      explodes[i].show()
      if ( explodes[i].life > 180 ) { explodes.splice(i, 1) }
    }
    
    for ( let i = 0; i < holes.length; i++ ) {
      holes[i].show()
    }
       
}
