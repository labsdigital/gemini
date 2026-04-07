const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let score = 0;
let direction = 'right';
let changingDirection = false;
let gameRunning = true;

// Web Audio API setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(frequency, duration) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration / 1000);
}


function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff00ff';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#00ffff'; // Head color
            ctx.shadowColor = '#00ffff';
        } else {
            ctx.fillStyle = '#00ff00'; // Body color
            ctx.shadowColor = '#00ff00';
        }
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    ctx.shadowBlur = 0;
}

function update() {
    if (!gameRunning) return;

    changingDirection = false;

    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver();
        return;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = 'Score: ' + score;
        playTone(800, 50);
        generateFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    gameRunning = false;
    playTone(200, 500);
    gameOverElement.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    scoreElement.textContent = 'Score: 0';
    gameRunning = true;
    gameOverElement.classList.add('hidden');
    generateFood();
    main();
}

function handleKeyPress(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.key;
    const goingUp = direction === 'up';
    const goingDown = direction === 'down';
    const goingLeft = direction === 'left';
    const goingRight = direction === 'right';

    if (keyPressed === 'ArrowUp' && !goingDown) direction = 'up';
    if (keyPressed === 'ArrowDown' && !goingUp) direction = 'down';
    if (keyPressed === 'ArrowLeft' && !goingRight) direction = 'left';
    if (keyPressed === 'ArrowRight' && !goingLeft) direction = 'right';
}

function main() {
    if (!gameRunning) return;
    setTimeout(() => {
        update();
        draw();
        main();
    }, 100);
}

document.addEventListener('keydown', handleKeyPress);
restartButton.addEventListener('click', restartGame);

generateFood();
main();
