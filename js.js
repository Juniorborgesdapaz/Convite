document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const gameSize = { width: 400, height: 400 };
    const snakeSize = 20;
    let snake = [{ x: 200, y: 200 }];
    let food = { x: 0, y: 0 };
    let direction = { x: 0, y: 0 };
    let speed = 10;
    let lastRenderTime = 0;

    function main(currentTime) {
        window.requestAnimationFrame(main);
        const sinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (sinceLastRender < 1 / speed) return;
        lastRenderTime = currentTime;

        update();
        draw();
    }

    window.requestAnimationFrame(main);

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            placeFood();
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= gameSize.width || head.y < 0 || head.y >= gameSize.height) {
            snake = [{ x: 200, y: 200 }];
            direction = { x: 0, y: 0 };
        }
    }

    function draw() {
        gameArea.innerHTML = '';
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.left = segment.x + 'px';
            snakeElement.style.top = segment.y + 'px';
            snakeElement.classList.add('snake');
            gameArea.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.style.left = food.x + 'px';
        foodElement.style.top = food.y + 'px';
        foodElement.classList.add('food');
        gameArea.appendChild(foodElement);
    }

    function placeFood() {
        food.x = Math.floor(Math.random() * (gameSize.width / snakeSize)) * snakeSize;
        food.y = Math.floor(Math.random() * (gameSize.height / snakeSize)) * snakeSize;
    }

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -snakeSize }; break;
            case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: snakeSize }; break;
            case 'ArrowLeft': if (direction.x === 0) direction = { x: -snakeSize, y: 0 }; break;
            case 'ArrowRight': if (direction.x === 0) direction = { x: snakeSize, y: 0 }; break;
        }
    });

    document.querySelector('.up').addEventListener('click', () => direction = { x: 0, y: -snakeSize });
    document.querySelector('.down').addEventListener('click', () => direction = { x: 0, y: snakeSize });
    document.querySelector('.left').addEventListener('click', () => direction = { x: -snakeSize, y: 0 });
    document.querySelector('.right').addEventListener('click', () => direction = { x: snakeSize, y: 0 });


    placeFood();
});
