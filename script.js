const WIDTH = 300;
const HEIGHT = 300;

const BG_COLOR = 'white';
const BORDER_COLOR = 'black';
const SNAKE_COLOR = 'green';
const SNAKE_HEAD_COLOR = 'darkgreen';

var gameCanvas = document.getElementById('game');
var scoreCounter = document.getElementById('score');
var highScoreCounter = document.getElementById('high-score');
var gameOver = document.getElementById('game-over');
var ctx = gameCanvas.getContext("2d");

gameCanvas.width = WIDTH;
gameCanvas.height = HEIGHT;

var snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150}
]

var score = 0;
var highScore = 0;
var dx = 10;
var dy = 0;
var foodX, foodY;
var run = true;

function generateFood() {
    foodX = Math.floor(Math.random() * 30) * 10;
    foodY = Math.floor(Math.random() * 30) * 10;
    if (snake.includes({x: foodX, y: foodY})) {
        generateFood();
    }
}

function collidingWithSelf() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function moveSnake() {
    if (!run) {
        return;
    }
    newX = snake[0].x + dx;
    newY = snake[0].y + dy;
    if (newX >= WIDTH || newX < 0 || newY >= HEIGHT || newY < 0) {
        endGame();
        return;
    }
    
    if (newX == foodX && newY == foodY) {
        score++;
        if (score > highScore) {
            highScore = score;
        }
        scoreCounter.innerHTML = score;
        highScoreCounter.innerHTML = highScore;
        generateFood();
    } else {
        snake.pop();
    }
    snake.unshift({x: newX, y: newY});
    if (collidingWithSelf()) {
        endGame();
        return;
    }
    render();
}

function render() {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.strokestyle = BORDER_COLOR;
    

    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, 10, 10);
    
    snake.forEach((snakePart) => {
        ctx.fillStyle = SNAKE_COLOR;
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.lineJoin = 'bevel';
        ctx.strokestyle = BG_COLOR;
    });

    ctx.fillStyle = SNAKE_HEAD_COLOR;
    ctx.fillRect(snake[0].x, snake[0].y, 10, 10);

    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function changeDirection(dir) {
    if (dir == 'ArrowUp') {
        if (dy == 0) {
            dx = 0;
            dy = -10;
        }
    } else if (dir == 'ArrowDown') {
        if (dy == 0) {
            dx = 0;
            dy = 10;
        }
    } else if (dir == 'ArrowLeft') {
        if (dx == 0) {
            dx = -10;
            dy = 0;
        }
    } else if (dir == 'ArrowRight') {
        if (dx == 0) {
            dx = 10;
            dy = 0;
        }
    }
}

document.addEventListener('keydown', (event) => {
    if (!run) {
        gameOver.style.display = 'none';
        run = true;
        startGame();
    } else {
        changeDirection(event.key);
    }
    
});

function startGame() {
    snake = [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150}
    ]
    
    score = 0;
    dx = 10;
    dy = 0;
    scoreCounter.innerHTML = score;
    generateFood();
    render();
}

function endGame() {
    run = false;
    gameOver.style.display = 'flex';
}

startGame();
var moveSnakeInterval = setInterval(moveSnake, 200);
gameOver.onclick = () => {
    gameOver.style.display = 'none';
    run = true;
    startGame();
}

gameCanvas.onclick = (e) => {
    let leftBorder = document.body.clientWidth / 2 - WIDTH / 2;
    let topBorder = document.body.clientHeight / 2 - HEIGHT / 2 - 15;
    let x = e.clientX - leftBorder;
    let y = e.clientY - topBorder;
    if (75 <= x && x <= 225) {
        if (y <= 75) {
            changeDirection("ArrowUp");
        } else if (y >= 225) {
            changeDirection("ArrowDown");
        }
    } else if (75 <= y && y <= 225) {
        if (x <= 75) {
            changeDirection("ArrowLeft");
        } else if (x >= 225) {
            changeDirection("ArrowRight");
        }
    }

}