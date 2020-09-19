class Player {
    constructor(key, x, y) {
        this.pos = createVector(x, y)
        this.ammo = 0
        this.key = key
        this.dest = false
        this.shield = false
        this.power = 0
        this.sucked = false
        this.redshift = 0
    }

    update() {
        if ( this.dest || this.sucked) { return }
        
        var speed = createVector(mouseX-width/2, mouseY-height/2)
        speed.limit(5)
        
        for (let st of stars) {
            let d = dist(st.pos.x, st.pos.y, this.pos.x, this.pos.y)//+100
            if (d < 200) {
                d = d < 200 ? 200 : d
                speed.add(createVector(st.pos.x-this.pos.x, st.pos.y-this.pos.y).setMag(50000/(d*d)))
            }
        }
        
        for (let ho of holes) {
            let d = dist((ho.pos.x), (ho.pos.y), this.pos.x, this.pos.y)//+100
            if (d < 200){
                if ( d < 70 ) {
                  this.dest = true
                  this.sucked = true
                  setTimeout(() => location.replace("https://spaceadvent.glitch.me/lose"), 3000)
                  continue
                }
              
                d = d < 100 ? 100 : d
                speed.add(createVector((ho.pos.x)-this.pos.x, (ho.pos.y)-this.pos.y).setMag(40000/(d*d)))
            }
        }
      
        if ( this.shield ) {
            speed = 0
            this.power -= 5
            this.power = Math.max(this.power, 0)
        } else {
            this.power += 1
        }
        
        this.pos.add(speed)
        this.pos.x = constrain(this.pos.x, 0, 4*width)
        this.pos.y = constrain(this.pos.y, 0, 4*height)
    }

    show() {
        if ( this.sucked ) {
          push()
          fill(255, 0, 0, 255-this.redshift)
          //image(s, this.pos.x-70, this.pos.y-50, 140, 100)
          ellipse(this.pos.x, this.pos.y, 70)
          this.redshift += 2
          pop()
        }
        if ( this.dest ) { return }
        
        image(s, this.pos.x-70, this.pos.y-50, 140, 100)
        if ( this.shield ) {
          push()
          fill(240, 240, 240, 100)
          ellipse(this.pos.x, this.pos.y, 100)
          pop()
       }
        
        
    }
    
}

class Bullet {
    constructor(p, e) {
        this.pos = createVector(p.x, p.y)  
        this.end = createVector(mouseX, mouseY)
        this.speed = createVector(this.end.x-width/2, this.end.y-height/2)
        this.speed.setMag(15)
      
      
        if ( e ) {
          this.end = e
          this.speed = createVector(player.pos.x-this.pos.x, player.pos.y-this.pos.y)
          this.speed.setMag(10)
        }
    }
  
    update() {
        this.pos.add(this.speed)  
    }
    
    show() {
        fill(255)
        image(bu, this.pos.x-15, this.pos.y-15, 30, 30)
    }

}