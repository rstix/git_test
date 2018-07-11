const canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight 

const c = canvas.getContext("2d")

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight  
    init()
})

window.addEventListener('mousemove',function(e){
    mouse.x = e.x
    mouse.y = e.y 
})

function distance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}

const colorArr = ['#F4640D','#F6A30B','#F7EC11','#1CEDF0','#127B9A']

function Circle(x,y,dx,dy,radius){
    this.x = x
    this.dx = dx
    this.y = y
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArr[Math.floor(Math.random()*colorArr.length)]

    this.draw = ()=>{
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle = this.color
        c.stroke()
        c.closePath()
        
       
    }

    this.update = particles => {
        // if(this.x+this.radius > innerWidth || this.x-this.radius<0){
        //     this.dx = -this.dx
        // }
    
        // if(this.y+this.radius > innerHeight || this.y-this.radius<0){
        //     this.dy = -this.dy
        // }
        // this.x += this.dx
        // this.y += this.dy

        // if((mouse.x - this.x) < 50 && mouse.x - this.x > -50 && (mouse.y - this.y) < 50 && mouse.y - this.y > -50){
        //     if(this.radius< 40){
        //         this.radius += 1
        //     }
   
        // }else if (this.radius > this.minRadius){
        //     this.radius -= 1
        // }

        this.draw()
    }
}

console.log(distance(0,0,10,10))

let particles = []

function init(){
    particles = []
    for(let i = 0; i < 7 ;i++){
        let radius = 70
        // Math.random()*4+1
        let x = Math.random()*(innerWidth - 2*radius) +radius
        let y = Math.random()*(innerHeight - 2*radius) +radius
        let dx = (Math.random()-0.5)*4
        let dy = (Math.random()-0.5)*4

        if(i != 0){
            for(let j = 0; j < particles.length ;j++){
                if(distance(x,y,particles[j].x,particles[j].y)< 2*radius){
                    x = Math.random()*(innerWidth - 2*radius) +radius
                    y = Math.random()*(innerHeight - 2*radius) +radius
                    j = -1
                }
            }
        }

        particles.push(new Circle(x,y,dx,dy,radius))
    }
}


function animate(){
    requestAnimationFrame(animate)

    c.clearRect(0,0,innerWidth,innerHeight)

    for(let i = 0; i < particles.length;i++){
        particles[i].update()
    }


}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function drawLine(){
    c.moveTo(canvas.width/3,canvas.height/2)
    c.lineTo(2*canvas.width/3,canvas.height/2)
    c.stroke()
}


    
init()
animate()