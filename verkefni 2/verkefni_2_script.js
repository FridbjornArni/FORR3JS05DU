class PowerPellet {
constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10; 
    this.color = 'yellow';
}
}

class PacMan {
constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30; 
    this.color = 'yellow';
    this.lives = 3;
    this.speed = 2;
    this.angle = 0.2; 
}

move(dx, dy) {
    this.x += dx;
    this.y += dy;

    this.x = Math.max(this.radius, Math.min(this.x, canvas.width - this.radius));
    this.y = Math.max(this.radius, Math.min(this.y, canvas.height - this.radius));
}
}

class Ghost {
constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 20; 
    this.color = color;
    this.direction = Math.random() * 2 * Math.PI;
    this.speed = 2;
}

move() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    if(this.x < this.radius || this.x > canvas.width - this.radius) {
    this.direction = Math.PI - this.direction;
    }

    if(this.y < this.radius || this.y > canvas.height - this.radius) {
    this.direction = -this.direction;
    }
}
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let pacMan = new PacMan(100, 100);
let powerPellets = [
new PowerPellet(20, 20),
new PowerPellet(canvas.width - 20, 20),
new PowerPellet(20, canvas.height - 20),
new PowerPellet(canvas.width - 20, canvas.height - 20),
];

let ghosts = [
new Ghost(200, 200, 'red'),
new Ghost(300, 300, 'pink'),
new Ghost(400, 400, 'cyan'),
new Ghost(500, 500, 'orange'),
new Ghost(150, 150, 'blue'),
new Ghost(350, 350, 'green'),
];

function checkCollisions() {
powerPellets.forEach((pellet, index) => {
    if (Math.hypot(pacMan.x - pellet.x, pacMan.y - pellet.y) < pacMan.radius + pellet.radius) {
    powerPellets.splice(index, 1);
    pacMan.lives += 1; 
    }
});

ghosts.forEach((ghost, index) => {
    if (Math.hypot(pacMan.x - ghost.x, pacMan.y - ghost.y) < pacMan.radius + ghost.radius) {
    pacMan.lives -= 1; 
    pacMan.x = 100; 
    pacMan.y = 100;
    }

    ghosts.forEach((otherGhost, otherIndex) => {
    if (index !== otherIndex && Math.hypot(ghost.x - otherGhost.x, ghost.y - otherGhost.y) < ghost.radius + otherGhost.radius) {
        ghost.direction = Math.random() * 2 * Math.PI; 
        otherGhost.direction = Math.random() * 2 * Math.PI;
    }
    });
});
}

function resizeCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function update() {
pacMan.move(1, 1);
ghosts.forEach(ghost => ghost.move());
}

function render() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

powerPellets.forEach((pellet) => {
    ctx.beginPath();
    ctx.arc(pellet.x, pellet.y, pellet.radius, 0, Math.PI * 2);
    ctx.fillStyle = pellet.color;
    ctx.fill();
});

ctx.beginPath();
ctx.arc(pacMan.x, pacMan.y, pacMan.radius, pacMan.angle, Math.PI * 2 - pacMan.angle);
ctx.lineTo(pacMan.x, pacMan.y);
ctx.fillStyle = pacMan.color;
ctx.fill();

ghosts.forEach((ghost) => {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);
    ctx.fillStyle = ghost.color;
    ctx.fill();
});

checkCollisions();
update();

window.requestAnimationFrame(render);
}

render();