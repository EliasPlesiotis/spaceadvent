const quotes = [
    "May the gravitational force be with you",
    "This is Major Tom to ground control",
    "Houston we have a problem",
    "Is this Stanley Kubrick?"
]


window.onload = () => {
    let banner = document.querySelector('.banner')
    let tut = document.querySelector('.tut')
    let btn = document.querySelector('.btn')
    let folded = true
    
    banner.innerHTML = quotes[Math.floor(Math.random()*quotes.length)]
    btn.onclick = () => {
      if ( folded ) {
        tut.style.left = "75%";
        btn.style.left = "70%"
        folded = false
      } else {
        tut.style.left = "100%";
        btn.style.left = "95%"
        folded = true
      }
    }
    
}