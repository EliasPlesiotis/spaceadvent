let key
let player
let players = {}
let eat
let bg
let b
let bu
let r
let s
let st
let rocks = []
let stars = []
let bullets = []
let enbull = []
let connected = false
let socket = new WebSocket('wss://spaceadvent.glitch.me/v1/ws')


socket.addEventListener("message", (m) => {
    let msg = JSON.parse(m.data)
    enbull = []
    players = {}
    
    for (let i = 0; i < 200; i++) {
        rocks[i] = new Rock(msg.Rocks[i].pos.x, msg.Rocks[i].pos.y, msg.Rocks[i].type)
    }  
    
    if (msg.Sps != null) {
        for (let p of msg.Sps) {
            let pl = new Player(p.Key, p.P.x, p.P.y)
            players[p.Key] = pl
            if ( p.Bull != null ) {
                for (let b of p.Bull){
                    enbull.push(new Bullet(createVector(b.x, b.y)))
                }
            }
        }
    }
    
    if (msg.Stars != null) {
        for (let i = 0; i < 20; i++) {
            stars[i] = new Star(msg.Stars[i].pos.x, msg.Stars[i].pos.y)
        }
    }
    update()
})

const update = () => {  
    if (connected) {
        let b = []
        for (let bu of bullets) {
            b.push({x: bu.pos.x, y: bu.pos.y})
        }
        let data = {
            pos: {
                x: player.pos.x,
                y: player.pos.y
            },
            bull: b,
            ate: eat,
        }
        socket.send(JSON.stringify(data))
        //update()
    }
    eat = -1
}

setInterval(() => { return null }, 33)

socket.onopen = () => { connected = true; }

function preload() {
    bg = loadImage('static/assets/space.png')
    b = loadImage('static/assets/bullets.png')
    r = loadImage('static/assets/rock.png')
    s = loadImage('static/assets/ufo2.png')
    st = loadImage('static/assets/star.png')
    bu = loadImage('static/assets/bullet.png')
}

function setup() {
    div = createDiv()
    canvas = createCanvas(1200, 600)
    div.child(canvas)

    div.style('width', '100vw')
    div.style('height', '99vh')

    canvas.style('width', '100%')
    canvas.style('height', '100%')
    
    player = new Player(random((width*4)-2*width), random((height*4)-2*height))
    
}

function keyPressed() {
    connected = true


    if ( keyCode == 32 && player.ammo >= 10) {
        bullets.push(new Bullet(createVector(player.pos.x, player.pos.y), null))
        player.ammo -= 10
    }
}

function mouseClicked() {
  if ( player.ammo >= 10 ) {
    bullets.push(new Bullet(createVector(player.pos.x, player.pos.y)))
    player.ammo -= 10
  }
}



function draw() {
    background(bg)

    fill(255)
    
    textSize(20)
    textFont('Arial')
    text('Ammo: '+ player.ammo/10, 30, 50)
    
    translate(width/2 - player.pos.x, height/2 - player.pos.y)

    rect(-25, -25, 4850, 5)
    rect(-25, -25, 5, 2450)
    rect(4825, -25, 5, 2455)
    rect(-25, 2425, 4850, 5)
    
    player.update()
    player.show()

    //console.log(player.pos)

    for ( let i = 0; i < rocks.length; i++ ) {
        rocks[i].show()
        
        if (dist(rocks[i].pos.x, rocks[i].pos.y, player.pos.x, player.pos.y) < width/2) {
            if (dist(rocks[i].pos.x, rocks[i].pos.y, player.pos.x, player.pos.y) < 80/2 && rocks[i].r < 50) {
                eat = i
                player.ammo++
           }

            //if (((player.pos.x - rocks[i].pos.x < 90 && player.pos.x - rocks[i].pos.x > -60) && (player.pos.y - rocks[i].pos.y < 90 && player.pos.y - rocks[i].pos.y > -60)) && rocks[i].r > 20) {
            if (dist(player.pos.x, player.pos.y, rocks[i].pos.x, rocks[i].pos.y) < 80 && rocks[i].r > 50) {
                socket.close()
                noLoop()
                location.replace("https://spaceadvent.glitch.me/lose")
            }

            if ( rocks[i].r > 50 && bullets != null) {
                for ( let j = 0; j < bullets.length; j++ ) {
                    if (dist(bullets[j].pos.x, bullets[j].pos.y, rocks[i].pos.x, rocks[i].pos.y) < 55) {
                        eat = i
                        d = rocks[i].pos
                        bullets.splice(j, 1)
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

    for ( let p in players ) {
        if (p != null)
            image(s, players[p].pos.x-70, players[p].pos.y-50, 140, 100)
    }

    for ( let i = 0; i < enbull.length; i++ ) {
        enbull[i].show()
        if (dist(enbull[i].pos.x, enbull[i].pos.y, player.pos.x, player.pos.y) < 60/2) {
            socket.close()
            location.replace("https://spaceadvent.glitch.me/lose")
        }
    }

    for ( let i = 0; i < stars.length; i++ ) {
        stars[i].show()
    }
}


