export class Paddle {
    width = 200;
    height = 30;
    left = 0;
    top = 200;
    borderRadius = 10;
    color = "white";

    #intervalId = null;

    constructor(left, top) {
        this.left = left;
        this.top = top;
    }

    validateAndFixPosition() {
        if (this.left < 0) {
            this.left = 0;
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }

        if (this.left + this.width > 1700) {
            this.left = 1700 - this.width;
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }
    }

    startMove(step) {
        if (this.#intervalId !== null) return;

        this.#intervalId = setInterval(() => {
            this.left += step * 5;
            this.validateAndFixPosition();
        }, 5);
    }

    stopMove() {
        if (!this.#intervalId) return;
        clearInterval(this.#intervalId);
        this.#intervalId = null;
        this.validateAndFixPosition();
    }
}

export class Ball {
    width = 30;
    height = 30;
    left = 0;
    top = 0;
    color = "white";
    borderRadius = 15;
    direction = 180;
    speed = 10;

    constructor(speed, left, top) {
        this.left = left;
        this.top = top;
        this.speed = speed;
    }

    resetBall() {
        this.left = 835;
        this.top = 700;
        this.speed = 0;
        this.direction = 180;
    }
}

export class Brick {
    width = 150;
    height = 40;
    left = 0;
    top = 0;
    color = "white";
    prevColor = "";
    borderRadius = 5;
    alive = true;

    constructor(left, top, color, alive = true) {
        this.left = left;
        this.top = top;
        this.color = color;
        this.alive = alive;
    }

    killBrick() {
        this.alive = false;
        this.prevColor = this.color;
        this.color = "";
    }

    resetBrick() {
        if (!this.alive) {
            this.alive = true;
            this.color = this.prevColor;
        }
    }
}

export default class Brain {
    // Current game
    score = 0;
    scores = [];
    lastScore = 0;
    level = 1;
    bricksLeft = 27;
    ballSpeed = 3 + this.level;
    ballInterval = null;

    // Game dimensions
    width = 1700;
    height = 1000;

    // Add ball and paddle
    paddle = new Paddle(750, 915);
    ball = new Ball(3 + this.level, 835, 700);

    // Add bricks
    row1Color = "#F0A6F7";
    row2Color = "#A3F0E0";
    row3Color = "#6CDAFC";
    rowTop = 80;
    rowSpacing = 60;
    colWidth = 170;
    colStart = (1700 - 150 - 8 * this.colWidth) / 2;

    brick11 = new Brick(this.colStart, this.rowTop, this.row1Color);
    brick12 = new Brick(
        this.colStart + this.colWidth,
        this.rowTop,
        this.row1Color
    );
    brick13 = new Brick(
        this.colStart + this.colWidth * 2,
        this.rowTop,
        this.row1Color
    );
    brick14 = new Brick(
        this.colStart + this.colWidth * 3,
        this.rowTop,
        this.row1Color
    );
    brick15 = new Brick(
        this.colStart + this.colWidth * 4,
        this.rowTop,
        this.row1Color
    );
    brick16 = new Brick(
        this.colStart + this.colWidth * 5,
        this.rowTop,
        this.row1Color
    );
    brick17 = new Brick(
        this.colStart + this.colWidth * 6,
        this.rowTop,
        this.row1Color
    );
    brick18 = new Brick(
        this.colStart + this.colWidth * 7,
        this.rowTop,
        this.row1Color
    );
    brick19 = new Brick(
        this.colStart + this.colWidth * 8,
        this.rowTop,
        this.row1Color
    );

    brick21 = new Brick(
        this.colStart,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick22 = new Brick(
        this.colStart + this.colWidth,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick23 = new Brick(
        this.colStart + this.colWidth * 2,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick24 = new Brick(
        this.colStart + this.colWidth * 3,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick25 = new Brick(
        this.colStart + this.colWidth * 4,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick26 = new Brick(
        this.colStart + this.colWidth * 5,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick27 = new Brick(
        this.colStart + this.colWidth * 6,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick28 = new Brick(
        this.colStart + this.colWidth * 7,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );
    brick29 = new Brick(
        this.colStart + this.colWidth * 8,
        this.rowTop + this.rowSpacing,
        this.row2Color
    );

    brick31 = new Brick(
        this.colStart,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick32 = new Brick(
        this.colStart + this.colWidth,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick33 = new Brick(
        this.colStart + this.colWidth * 2,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick34 = new Brick(
        this.colStart + this.colWidth * 3,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick35 = new Brick(
        this.colStart + this.colWidth * 4,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick36 = new Brick(
        this.colStart + this.colWidth * 5,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick37 = new Brick(
        this.colStart + this.colWidth * 6,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick38 = new Brick(
        this.colStart + this.colWidth * 7,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );
    brick39 = new Brick(
        this.colStart + this.colWidth * 8,
        this.rowTop + this.rowSpacing * 2,
        this.row3Color
    );

    brickArray = [
        this.brick11,
        this.brick12,
        this.brick13,
        this.brick14,
        this.brick15,
        this.brick16,
        this.brick17,
        this.brick18,
        this.brick19,

        this.brick21,
        this.brick22,
        this.brick23,
        this.brick24,
        this.brick25,
        this.brick26,
        this.brick27,
        this.brick28,
        this.brick29,

        this.brick31,
        this.brick32,
        this.brick33,
        this.brick34,
        this.brick35,
        this.brick36,
        this.brick37,
        this.brick38,
        this.brick39,
    ];

    startMovePaddle(paddle, step) {
        paddle.startMove(step);
    }

    stopMovePaddle(paddle) {
        paddle.stopMove();
    }

    moveBall() {
        this.ballInterval = setInterval(() => {
            this.ballCollisions(this.ball, this.paddle, this.brickArray);
            this.ball.left +=
                this.ballSpeed *
                Math.sin((this.ball.direction * Math.PI) / 180);
            this.ball.top +=
                -this.ballSpeed *
                Math.cos((this.ball.direction * Math.PI) / 180);
        }, 5);
    }

    stopBall(pause = false) {
        if (!this.ballInterval) return;
        clearInterval(this.ballInterval);
        this.ballInterval = null;
        if (!pause) {
            this.ball.resetBall();
        }
    }

    // collisons
    ballCollisions(ball, paddle, brickArray) {
        this.ballWallCollision(ball);
        if (ball.top < 250) {
            this.ballBrickCollision(ball, brickArray);
        }
        if (ball.top > 850) {
            this.ballPaddleCollision(ball, paddle);
        }
    }

    ballWallCollision(ball) {
        //left
        if (ball.left <= 0) {
            ball.direction -= 180 - (270 - ball.direction) * 2;
        }
        //top
        else if (ball.top <= 0) {
            ball.direction -= (180 - (360 - ball.direction) * 2) % 360;
        }
        //right
        else if (ball.left >= 1670) {
            ball.direction += 180 + (90 - ball.direction) * 2;
        }
    }

    ballPaddleCollision(ball, paddle) {
        if (ball.top >= 885 && ball.top <= 915) {
            if (ball.left + 30 > paddle.left && ball.left < paddle.left + 200) {
                let intersectionFactor = (ball.left + 30 - paddle.left) / 230;

                if (intersectionFactor < 0.5) {
                    if (intersectionFactor < 0.15) intersectionFactor = 0.15;
                    ball.direction = 270 + 90 * intersectionFactor * 2;
                } else {
                    if (intersectionFactor > 0.85) intersectionFactor = 0.85;
                    ball.direction = 90 * (intersectionFactor - 0.5) * 2;
                }
            }
        }
    }

    ballBrickCollision(ball, brickArray) {
        brickArray.forEach((brick) => {
            if (brick.alive) {
                //left
                if (
                    ball.direction < 180 &&
                    ball.direction > 0 &&
                    ball.top + 30 > brick.top &&
                    ball.top < brick.top + 40 &&
                    ball.left + 30 > brick.left &&
                    ball.left + 29 < brick.left
                ) {
                    ball.direction += 180 + (90 - ball.direction) * 2;
                    brick.killBrick();
                    this.score += 10 * this.level;
                    this.bricksLeft--;
                }
                // top
                else if (
                    ball.direction < 270 &&
                    ball.direction > 90 &&
                    ball.top + 30 > brick.top &&
                    ball.top < brick.top + 29 &&
                    ball.left + 30 > brick.left &&
                    ball.left < brick.left + 150
                ) {
                    ball.direction -= (180 - (360 - ball.direction) * 2) % 360;
                    brick.killBrick();
                    this.score += 10 * this.level;
                    this.bricksLeft--;
                }
                //right
                else if (
                    ball.direction < 360 &&
                    ball.direction > 180 &&
                    ball.top + 30 > brick.top &&
                    ball.top < brick.top + 40 &&
                    ball.left - 150 < brick.left &&
                    ball.left > brick.left + 149
                ) {
                    ball.direction -= 180 - (270 - ball.direction) * 2;
                    brick.killBrick();
                    this.score += 10 * this.level;
                    this.bricksLeft--;
                }
                //bottom;
                else if (
                    (ball.direction < 90 || ball.direction > 270) &&
                    ball.top - 31 > brick.top &&
                    ball.top < brick.top + 40 &&
                    ball.left + 30 > brick.left &&
                    ball.left < brick.left + 150
                ) {
                    ball.direction -= (180 - (360 - ball.direction) * 2) % 360;
                    brick.killBrick();
                    this.score += 10 * this.level;
                    this.bricksLeft--;
                }
            }
        });
    }

    ballOut() {
        if (this.ball.top > 1000) {
            return true;
        } else {
            return false;
        }
    }

    gameState() {
        if (this.bricksLeft == 0) return "lvlUp";
        if (this.ballOut()) return "endGame";
    }

    resetBricks() {
        this.bricksLeft = 27;
        for (const brick of this.brickArray) {
            brick.resetBrick();
        }
    }

    endGame() {
        console.log("Game over!");
        this.level = 1;
        this.ballSpeed = 3 + this.level;
        this.paddle.left = 750;
        this.lastScore = this.score;
        this.scores.push(this.score);
        this.scores.sort((a, b) => b - a);
        this.score = 0;
        this.stopBall();
        this.resetBricks();
    }

    nextLevel() {
        this.level += 1;
        console.log("Next level: " + this.level);
        this.stopBall();
        this.ballSpeed = 3 + this.level;
        this.resetBricks();
    }
}
