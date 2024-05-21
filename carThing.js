const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66","green", "blue", "red", "yellow", "orange", "brown"]
const randColor = () => colors[Math.floor(Math.random() * colors.length)]
const anyNum = (min, max) => (Math.floor(Math.random() * (max - min))) + min
canvas.width = 576
canvas.height = 1024
const checkCollision = (player, obstacle) => {
    if(player.y < obstacle.y + obstacle.height && (player.x < obstacle.x + obstacle.width && player.x + player.width > obstacle.x)) {
        init()
    }
}
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
}

class Car {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.veloxityX = 3
        this.veloxityY = 1.5
        this.width = 20
        this.height = 20
        this.color = color
    }

    draw() {
        c.beginPath()
        c.fillRect(this.x, this.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

let you = new Car(300, 900, randColor())
let cars

init = () => {
    cars = []
    let Y = 100
    for (let wave = 0; wave < 15; wave++) {
        Y -= 85
        for(let row = 0; row < 10; row++) {
            let X = anyNum(20, 520)
            
            let clr = "black"
            cars.push(new Car(X, Y, clr))
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    you.update()
    cars.forEach((car, i) => {
        car.update()
        car.y += car.veloxityY
        if(car.y > 1024) {
            cars.splice(i, 1)
        }
        checkCollision(you, car)
    });

    if(keys.right.pressed && you.x + you.width <= 576) {
        you.x += you.veloxityX
    } else if(keys.left.pressed && you.x > 0) {
        you.x -= you.veloxityX
    }

}

init()
animate()

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:    //LEFT
            keys.left.pressed = false;          
            break;
        case 68:    //RIGHT
            keys.right.pressed = false; 
            break;
    }
});

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:    //LEFT
            keys.left.pressed = true;          
            break;
        case 68:    //RIGHT
            keys.right.pressed = true; 
            break;
    }
});

// tl = new TimelineMax({repeat: -1});
// tl.to(".e", 2, {
// 	x: Math.floor( Math.random() * document.querySelector(window).width() ),
// 	y: Math.floor( Math.random() * document.querySelector(window).height() ),
// 	onComplete: function(){
//         this.vars.css.x = Math.floor( Math.random() * document.querySelector(window).width() );
//         this.vars.css.y = Math.floor( Math.random() * document.querySelector(window).height() );
//         this.invalidate();
//     }
// });