class Starfall {
    constructor( startX, startY, speed, color) {
        this.startX = startX;
        this.startY = startY;
        this.color = color;
        this.speed = speed;
    }
}

const canvas = document.querySelector('.animation-frame');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


function draw(x, y) {
    c.lineTo(x, y);
}

const animations = [fallingStars, empty];
let currentAnimation = 0;

const stars = [new Starfall(0, -100)];
const offsetX = 100;
const offsetY = 200;

const colors = ['red', 'green', 'yellow'];

function empty() {
    c.clearRect(0, 0, innerWidth, innerHeight);
}

function fallingStars() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    stars.forEach((star, index) => {
        c.beginPath();
        c.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        draw(star.startX, star.startY);
        draw(star.startX + offsetX, star.startY + offsetY);

        star.startX += star.speed * offsetX / 100;
        star.startY +=  star.speed * offsetY / 100;

        if(star.startY > innerWidth) {
            stars.splice(index, 1);
        }

        c.stroke();

        c.beginPath();
        c.arc(star.startX + offsetX, star.startY + offsetY, 1.5, 0, Math.PI * 2, false);
        c.fillStyle = star.color;
        c.fill();
        c.stroke();
    });


    if(Math.random() * 200 < 5 && stars.length < 25) {
        stars.push(new Starfall(-300 + (Math.random() * (innerWidth + 300)), -200, .7 + (Math.random() * 2), colors[Math.floor(Math.random() * colors.length)]));
    }

    requestAnimationFrame(animations[currentAnimation]);
}

function startAnimation() {
    requestAnimationFrame(animations[currentAnimation]);
}

addEventListener('keydown', event => {
    if(event.key === " ") {
        if(currentAnimation + 1 < animations.length) {
            currentAnimation++;
        }
        else {
            currentAnimation = 0;
        }

        startAnimation();
    }
});

const btn = document.querySelector(".btn");
btn.addEventListener( 'click', event => {
    console.log("clicked!")
});

requestAnimationFrame(fallingStars);
