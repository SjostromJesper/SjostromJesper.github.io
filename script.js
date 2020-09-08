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

const animations = [fallingStars, empty];
let currentAnimation = 0;

const stars = [];
const offsetX = 100;
const offsetY = 200;

const colors = ['red', 'rgba(175, 48, 186, 1)', 'yellow', 'rgba(4,248,255, 1)', 'rgb(255,228,128)'];

function empty() {
    c.clearRect(0, 0, innerWidth, innerHeight);
}

function fallingStars() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    stars.forEach((star, index) => {
        c.beginPath();
        c.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        c.lineTo(star.startX, star.startY);
        c.lineTo(star.startX + offsetX, star.startY + offsetY);

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


    if(Math.random() * 200 < 5 && stars.length < 50) {
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

window.addEventListener("scroll", event => {
    console.log("scrolling");
}, {passive: true});


// GENERATE SKILLBARS

class Skillbar {
    constructor(skillName, color) {
        this.skillName = skillName;
        this.color = color;

    }

    createElement(index) {
        const element = document.createElement('div');
        const text = document.createElement('p');

        element.setAttribute("class", this.skillName);
        element.style.width = (20 + staggerElements[index]) + '%';
        element.style.backgroundColor = this.color;

        text.innerText = this.skillName;
        text.style.color = 'black';
        text.style.fontWeight = '600';

        element.appendChild(text);

        return element;
    }
}

const languageColor = 'rgba(175, 48, 186, .8)';
const databaseColor = 'rgba(4, 194, 201, .3)';
const toolsColor = 'yellow'

const skillbars = [
    new Skillbar('java', languageColor),
    new Skillbar('C', languageColor),
    new Skillbar('Typescript', languageColor),
    new Skillbar('C++', languageColor),
    new Skillbar('HTML/CSS', languageColor),
    new Skillbar('rust', languageColor),
    new Skillbar('go', languageColor),
    new Skillbar('mongoDB', databaseColor),
    new Skillbar('mysql', databaseColor),
    new Skillbar('graphql', databaseColor),
    new Skillbar('mariadb', databaseColor)
];

const parent = document.getElementById('skillbars');

const staggerElements = [];
const distance = 2;

if(skillbars.length % 2 === 1) {
    const base = Math.round(skillbars.length / 2);
    let step = base - 1;

    skillbars.forEach((item, index) => {
        if(index + 1 < base) {
            staggerElements.push(step * distance);
            step--;
        }
        else if(index + 1 > base) {
            staggerElements.push(step * distance);
            step++;
        }
        else {
            staggerElements.push(0);
            step++;
        }
    })
}
else {
    const base1 = Math.round(skillbars.length / 2);
    const base2 = base1 + 1;
    let step = base1 - 1;

    skillbars.forEach((item, index) => {
        if(index + 1 < base1) {
            staggerElements.push(step * distance);
            step--;
        }
        else if(index + 1 > base2) {
            staggerElements.push(step * distance);
            step++;
        }
        else {
            staggerElements.push(0);
            if(index + 1 === base2) {
                step++;
            }
        }
    })
}

skillbars.forEach((skill, index) => {
    parent.appendChild(skill.createElement(index));
});

const scrollElement = document.querySelector("body");


scrollElement.addEventListener('scroll', function (e) {
    const nav = document.querySelector('.nav');
    if (e.path[0].scrollTop >= canvas.height - 20) {
        nav.classList.add('nav-colored');
        nav.classList.remove('nav-splash');

        console.log(canvas.height)
    } else {
        nav.classList.remove('nav-colored');
        nav.classList.add('nav-splash')
    }
}, false);


















requestAnimationFrame(fallingStars);
