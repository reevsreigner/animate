const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;  // 6876w by 12col 
const spriteHeight = 523;  //5230h by 10row
const staggerFrames = 5;

let frameX = 0;
let frameY = 0;
let gameFrame = 0;

const animationSelect = document.getElementById('animationSelect');
let selectedAnimation = animationSelect.value;

animationSelect.addEventListener('change', function() {
  selectedAnimation = animationSelect.value;
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const animationFrames = getAnimationFrames(selectedAnimation);
    let position = Math.floor(gameFrame / staggerFrames) % animationFrames.length;
    frameX = animationFrames[position].x;
    frameY = animationFrames[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
   
    gameFrame++;
    requestAnimationFrame(animate);
}

function getAnimationFrames(animationName) {
    switch(animationName) {
        case 'idle':
            return getFrames(0, 6);
        case 'jump':
            return getFrames(1, 6);
        case 'fall':
            return getFrames(2, 6);
        case 'run':
            return getFrames(3, 8);
        case 'dizzy':
            return getFrames(4, 10);
        case 'sit':
            return getFrames(5, 4);
        case 'roll':
            return getFrames(6, 6);
        case 'bite':
            return getFrames(7, 6);
        case 'KO':
            return getFrames(8, 11);
        case 'getHit':
            return getFrames(9, 3);
        default:
            return [];
    }
}

function getFrames(row, frames) {
    let animationFrames = [];
    for(let j = 0; j < frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = row * spriteHeight;
        animationFrames.push({x: positionX, y: positionY});
    }
    return animationFrames;
}

animate();
