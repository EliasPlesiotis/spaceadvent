class Rock {
    constructor(x, y, big) {
        this.pos = createVector(x, y)
        this.r = big? 100 : 20
        if ( this.r > 50 ) {
            this.speed = createVector(random(5)-2.5, random(5)-2.5)
            this.speed.setMag(1)
        }
    }
  
    show() {
        if (this.r == 20) image(b, this.pos.x, this.pos.y, this.r, this.r)
        else image(r, this.pos.x - this.r/2, this.pos.y - this.r/2, this.r, this.r)
    }

    update() {
        if ( this.r > 50 ) {
            if ( abs(this.pos.x) > 4*width || abs(this.pos.y) > 4*height || this.pos.x < 0 || this.pos.y < 0) {
                this.speed.mult(-1)
            }
            this.pos.add(this.speed)
        }
    }
}

class Tower {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.r = 300
    this.speed = createVector(random(5)-2.5, random(5)-2.5)
    this.speed.setMag(3)
        
  }
  
  shoot(pos, end) {
    enbull.push(new Bullet(createVector(this.pos.x, this.pos.y), createVector(player.pos.x, player.pos.y)))
  }
  
  update() {
    if ( dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < this.r && !player.shield ) {
      if ( random() < 0.015 ) { this.shoot() }
    }
    
    if ( dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 400 && !player.shield ) {
      this.pos.add(createVector(player.pos.x, player.pos.y).sub(this.pos).setMag(2))  
    } else { 
      this.pos.add(this.speed)
    }
    
    if ( abs(this.pos.x) > 4*width || abs(this.pos.y) > 4*height || this.pos.x < 0 || this.pos.y < 0) {
      this.speed.mult(-1)
    }
    
   
  }
  
  show() {
    image(t, this.pos.x-50, this.pos.y-50, 100, 100)
  }
  
}

class Star {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.speed = createVector(random(5)-2.5, random(5)-2.5)
        this.speed.setMag(1)        
    }

    update() {
      if ( abs(this.pos.x) > 4*width || abs(this.pos.y) > 4*height || this.pos.x < 0 || this.pos.y < 0) {
          this.speed.mult(-1)
      }
      
      let speed = this.speed
      for ( let i = 0; i < stars.length; i++ ) {
        let d = dist(stars[i].pos.x, stars[i].pos.y, this.pos.x, this.pos.y)
        
        if ( d < 20 && d > 10) {
          stars.splice(i, 1)
          holes.push(new BlackHole(this.pos.x, this.pos.y))
          this.pos = createVector(random(4700), random(2300))
          this.speed = createVector(random(5)-2.5, random(5)-2.5)
          this.speed.setMag(1)
          continue
        }
        
        if ( d < 200 && d > 10) {
          d = d < 200 ? 200 : d
          this.speed.add(createVector(stars[i].pos.x-this.pos.x, stars[i].pos.y-this.pos.y).setMag(3000/(d*d)))
        }

      }
      
      this.pos.add(this.speed)
      this.speed = speed
    }
  
    show() {
        image(st, this.pos.x-25, this.pos.y-25, 50, 50)
        push()
        noStroke()
        fill(color(0, 0, 255, 20))
        ellipse(this.pos.x, this.pos.y, 400)
        pop()
    }
}

class BlackHole {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.ang_sp = PI/500
        this.cur_ang = 0
        this.state = 149
    }
  
    show() {
      push()

      imageMode(CENTER)
      translate(this.pos.x-this.state/2, this.pos.y-this.state/2)
      rotate(-frameCount*PI/180)
      translate(-this.pos.x+this.state/2, -this.pos.y+this.state/2)
  
      image(bl, this.pos.x-this.state/2, this.pos.y-this.state/2, 150-this.state, 150-this.state)
      this.state--
      this.state = this.state < 1 ? 0 : this.state
      pop()
        
    }
}

class Explode {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.life = 40
    }
  
    update() {
        this.life += 3

    }
  
    show() {
        if ( this.life < 150 ) {
            image(exp, this.pos.x-this.life/2, this.pos.y-this.life/2, this.life, this.life)
        } else {}
    }
  
}
