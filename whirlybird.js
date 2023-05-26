const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const platformSrc = "platform.svg";
const backgroundSrc = "background.png";
canvas.width = 1024;
canvas.height = 576;
canvasWidth = canvas.width;
canvasHeight = canvas.height;
let goingDown = true;
let isFalling = true;
let offScreen = false;
let isColliding = false;
const gravity = 0.5;
const keys = {
    up: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    down: {
        pressed: false,
    }
}




function showMarkers() {
    c.fill();
    c.fillStyle = "green";
    c.fillRect(0, 100, 10, 2);
    c.fillRect(0, 200, 10, 2);
    c.fillRect(0, 300, 10, 2);
    c.fillRect(0, 400, 10, 2);
    c.fillRect(0, 500, 10, 2);
}

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
  }

const lineLine = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}

const checkPlatformCollision = (plat) => {
        return player.position.y + player.height + player.velocity.y -1 >= plat.position.y
        // && player.position.y + player.height + player.velocity.y >= plat.position.y 
        && player.position.x + player.width >= plat.position.x 
        && player.position.x <= plat.position.x + plat.width
}

class Character {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.speed = 10;
        this.position = {
            x: 220,
            y: 200,
        }

        this.velocity  = {
            x: 0,
            y: 0,
        }

    }

    draw() {
        c.fill();
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.fillStyle = "green";
        
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.velocity.y += gravity
        goingDown = true
        isFalling = true
        // this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y <= canvasHeight) {
            this.velocity.y += gravity; 
            goingDown = false;
            isFalling = true;
        } else {
            this.velocity.y = 0;
            goingDown = true;
            isFalling = false;
            offScreen = true;
        }
    }
}


class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y,
        }

        // this.height = image.height;
        // this.width = image.width;
        // this.image = image;
        this.width = 200
        this.height = 20

    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y);
        c.rect(this.position.x, this.position.y, this.width, this.height)
    }

}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y,
            image,
        }
  
        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }
  
    draw() {
        c.fillStyle = "blue";
        c.drawImage(this.image, this.position.x, this.position.y);
    }
  
  }

  const background = new GenericObject({
                    x: 0,
                    y: 0,
                    image: createImage(backgroundSrc)
                })

let scrollOffset = 0;
let player = new Character();
let platform1 = new Platform({
                    x: 180, 
                    y: 350,
                });
                

function mainGameLoop() {
    requestAnimationFrame(mainGameLoop);
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    // background.draw();
    showMarkers();
    platform1.draw();
    player.update();
    if(
        keys.right.pressed && player.position.x + player.width < canvasWidth) {
        player.position.x += 1;
    } else if(keys.left.pressed && player.position.x > 0) {
        player.position.x -= 1;
    }

    // if(player.position.y <= 200) {
    //         platform1.position.y += player.speed;
    //         player.velocity.y = 0;
    //         offScreen = true;
    // } else if(player.position.y >= 400) {
    //     platform1.position.y -= player.speed;
    //     player.velocity.y = 0;
    // } 
    

    let left = lineLine(platform1.position.x, platform1.position.y, platform1.position.x+platform1.width, platform1.position.y, player.position.x, player.position.y, player.position.x, player.position.y+player.height)
    let right = lineLine(platform1.position.x, platform1.position.y, platform1.position.x+platform1.width, platform1.position.y, player.position.x+player.width, player.position.y, player.position.x+player.width, player.position.y + player.height)
    let top = lineLine(platform1.position.x, platform1.position.y, platform1.position.x+platform1.width, platform1.position.y, player.position.x, player.position.y, player.position.x+player.width, player.position.y)
    let bottom = lineLine(platform1.position.x, platform1.position.y, platform1.position.x+platform1.width, platform1.position.y, player.position.x, player.position.y+player.height, player.position.x+player.width, player.position.y+player.height)

    if ((left || right || top || bottom) && (player.position.y < platform1.position.y)) {
    // if (checkPlatformCollision(platform1)) {
        console.log("collided");
        player.velocity.y = 0;
        goingDown = false;
        isColliding = true;
    }
    
}

mainGameLoop();

addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 65:    //LEFT
            keys.left.pressed = true; 
            lastKey = "left";    
            break;
        case 68:    //RIGHT
            keys.right.pressed = true; 
            lastKey = "right";      
            break;
        case 87:    //UP
            keys.up.pressed = true;
            if(goingDown) {
                player.velocity.y -= 35;         
            } 
            break; 
    }
})

addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 65:    //LEFT
            keys.left.pressed = false; 
            lastKey = "left";    
            break;
        case 68:    //RIGHT
            keys.right.pressed = false; 
            lastKey = "right";      
            break; 
    }
})