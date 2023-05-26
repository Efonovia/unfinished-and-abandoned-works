const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 576;
canvas.height = 576;
const gravity = 1;
const friction = 0.9;
let colors = ["blue", "green", "orange", "pink", "brown", "yellow", "purple"];

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min; 

function randColor(colorArr) {
    let k = Math.floor(Math.random() * colorArr.length);
    return colorArr[k];
}

class Ball {
    constructor(x, y, speedX, speedY, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }

    update() {        
        if(this.y + this.speedY + this.radius >= canvas.height) {
            this.speedY = -this.speedY * friction;
        } else {
            this.speedY += gravity;
        }

        if(this.x + this.speedX + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.speedX = -this.speedX * friction;
        }

        this.y += this.speedY;
        this.x += this.speedX;
        this.draw();
    }
}

let ballArray = []
function init() {
    for(let i = 0; i < 10; i++) {
        let x = randInt(100, canvas.width - 30);
        let y = randInt(100, canvas.height - 30);
        let dX = randInt(-2, 2);
        let dY = randInt(1, 5);
        let color = randColor(colors);
        let radius = randInt(20, 60);
        ballArray[i] = new Ball(x, y, dX, dY, radius, color);
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, 576, 576);;
    ballArray.forEach(ball => {
        ball.update();
    })
}
console.log(ballArray);
animate();

document.querySelector('body').addEventListener('click', () => {  
    init();
});