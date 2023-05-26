const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576
const keysLP = {
    upLP: {
        pressed: false,
    },
    downLP: {
        pressed: false,
    },
    leftLP: {
        pressed: false,
    },
    rightLP: {
        pressed: false,
    }
}
const keysRP = {
    upRP: {
        pressed: false,
    },
    downRP: {
        pressed: false,
    },
    leftRP: {
        pressed: false,
    },
    rightRP: {
        pressed: false,
    }
}

class Tank {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.width = 20
        this.height = 50
        this.color = color
        this.velocity = 2
    }

    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.width, this.height)
        c.fill()
        c.closePath()
    }

    steer() {
        c.beginPath()
        c.translate(this.x + (this.width/2), this.y + (this.height/2))
        c.rotate(22.5 * (Math.PI/180))
        c.translate(-(this.x + (this.width/2)), -(this.y + (this.height/2)))
        // c.fillStyle = "green"
        // c.fillRect(this.x, this.y, this.width, this.height)
        c.closePath()
    }

    update() {
        this.draw()
        if(keysLP.rightLP.pressed) {
            this.steer()
        }
    }
}


const orange = new Tank(100, 200, "orange")

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    if(keysLP.upLP.pressed) {
        orange.y -= orange.velocity
    } else if(keysLP.leftLP.pressed) {
        orange.x -= orange.velocity
    } else if(keysLP.downLP.pressed) {
        orange.y += orange.velocity
    }
    orange.update()
}

animate()

window.addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:    //LEFT
            keysLP.leftLP.pressed = true; 
            break;
        case 68:    //RIGHT
            keysLP.rightLP.pressed = true; 
            break;
        case 87:    //UP
            keysLP.upLP.pressed = true; 
            break; 
        case 83:    //DOWN
            keysLP.downLP.pressed = true; 
            break; 
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:    //LEFT
            keysLP.leftLP.pressed = false; 
            break;
        case 68:    //RIGHT
            keysLP.rightLP.pressed = false; 
            break;
        case 87:    //UP
            keysLP.upLP.pressed = false; 
            break; 
        case 83:    //DOWN
            keysLP.downLP.pressed = false; 
            break; 
    }
})