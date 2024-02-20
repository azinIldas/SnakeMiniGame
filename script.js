const gameArea = document.getElementById('gameArea');
const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;
const snakeSize = 20;
let snake = [{x: snakeSize * 5, y: snakeSize * 5}];
let food = {x: 0, y: 0};
let dx = snakeSize;
let dy = 0;
let lastRenderTime = 0;
const gameSpeed = 5; // Je höher die Zahl desto schwieriger
function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / gameSpeed) return;
    lastRenderTime = currentTime;

    updateGame();
    drawGame();
}

window.requestAnimationFrame(main);

function updateGame() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }

    if (snake[0].x < 0 || snake[0].x >= gameWidth || snake[0].y < 0 || snake[0].y >= gameHeight || snakeIntersection()) {
        snake = [{x: snakeSize * 5, y: snakeSize * 5}];
        dx = snakeSize;
        dy = 0;
        placeFood(); 
    }
}

function drawGame() {
    gameArea.innerHTML = '';
    snake.forEach((segment, index) => {
        const element = document.createElement('div');
        element.style.left = `${segment.x}px`;
        element.style.top = `${segment.y}px`;
        element.classList.add(index === 0 ? 'snake-head' : 'snake-body');
        gameArea.appendChild(element);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

function placeFood() {
    food.x = Math.floor(Math.random() * (gameWidth / snakeSize)) * snakeSize;
    food.y = Math.floor(Math.random() * (gameHeight / snakeSize)) * snakeSize;
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

function snakeIntersection() {
    return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': if (dy === 0) { dx = 0; dy = -snakeSize; } break;
        case 'ArrowDown': if (dy === 0) { dx = 0; dy = snakeSize; } break;
        case 'ArrowLeft': if (dx === 0) { dx = -snakeSize; dy = 0; } break;
        case 'ArrowRight': if (dx === 0) { dx = snakeSize; dy = 0; } break;
    }
});

placeFood();
