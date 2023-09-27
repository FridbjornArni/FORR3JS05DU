// verkefni 2
// Fribbi

class YellowBall {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = "yellow";
        context.fill();
        context.closePath();
    }
};


const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const yellowBall = new YellowBall(400, 300, 50);
yellowBall.draw(context);
