export default class UI {
    // real screen dimensions
    width = -1;
    height = -1;

    brain = null;
    appContainer = null;

    scaleX = 1;
    scaleY = 1;

    constructor(brain, appContainer) {
        this.brain = brain;
        this.appContainer = appContainer;
        this.setScreenDimensions();
    }

    setScreenDimensions(width, height) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain.width;
        this.scaleY = this.height / this.brain.height;
    }

    calculateScaledX(x) {
        return (x * this.scaleX) | 0;
    }

    calculateScaledY(y) {
        return (y * this.scaleY) | 0;
    }

    drawPaddle(paddle) {
        let div = document.createElement("div");

        div.style.zIndex = 10;
        div.style.position = "fixed";

        div.style.left = this.calculateScaledX(paddle.left) + "px";
        div.style.top = this.calculateScaledY(paddle.top) + "px";

        div.style.width = this.calculateScaledX(paddle.width) + "px";
        div.style.height = this.calculateScaledY(paddle.height) + "px";

        div.style.backgroundColor = paddle.color;
        div.style.borderRadius = paddle.borderRadius + "px";

        this.appContainer.append(div);
    }

    drawBall(ball) {
        let div = document.createElement("div");

        div.style.zIndex = 10;
        div.style.position = "fixed";

        div.style.left = this.calculateScaledX(ball.left) + "px";
        div.style.top = this.calculateScaledY(ball.top) + "px";

        div.style.width = this.calculateScaledX(ball.width) + "px";
        div.style.height = this.calculateScaledY(ball.height) + "px";

        div.style.backgroundColor = ball.color;
        div.style.borderRadius = ball.borderRadius + "px";

        this.appContainer.append(div);
    }

    drawBrick(brick) {
        let div = document.createElement("div");

        div.style.zIndex = 10;
        div.style.position = "fixed";

        div.style.left = this.calculateScaledX(brick.left) + "px";
        div.style.top = this.calculateScaledY(brick.top) + "px";

        div.style.width = this.calculateScaledX(brick.width) + "px";
        div.style.height = this.calculateScaledY(brick.height) + "px";

        div.style.backgroundColor = brick.color;
        div.style.borderRadius = brick.borderRadius + "px";

        this.appContainer.append(div);
    }

    drawAllBricks() {
        this.brain.brickArray.forEach((brick) => {
            this.drawBrick(brick);
        });
    }

    drawScoreboard() {
        let div = document.createElement("div");

        div.style.zIndex = 9;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(45) + "px";
        div.style.fontFamily = "Silkscreen";
        div.style.whiteSpace = "pre";

        div.style.top = this.calculateScaledY(10) + "px";
        div.style.width = "100%";
        div.style.height = this.calculateScaledY(50) + "px";

        let text =
            "speed: " + this.brain.level + "  |  score: " + this.brain.score;

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawPause() {
        let div = document.createElement("div");

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(300) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.top = "30%";
        div.style.width = "100%";
        div.style.height = "100%";

        let text = "||";

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawOver() {
        let div = document.createElement("div");

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(150) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.top = "11%";
        div.style.width = "100%";
        div.style.height = "100%";

        let text = "GAME OVER!";

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawLogo() {
        let div = document.createElement("div");

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(200) + "px";
        div.style.fontFamily = "Kaushan Script";

        div.style.top = "8%";
        div.style.width = "100%";
        div.style.height = "100%";

        let text = "Breikaut!";

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawPlay() {
        let div = document.createElement("div");
        div.id = "start";

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(50) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.left = this.calculateScaledX(500) + "px";
        div.style.top = "50%";
        div.style.width = this.calculateScaledX(700) + "px";
        div.style.height = this.calculateScaledY(80) + "px";

        let text = "Start game";

        div.textContent = text;

        div.style.cursor = "pointer";

        div.addEventListener("mouseover", () => {
            div.style.color = "#F0A6F7";
        });

        div.addEventListener("mouseout", () => {
            div.style.color = "white";
        });

        this.appContainer.append(div);
    }

    drawHiscores() {
        let div = document.createElement("div");
        div.id = "hiscores";

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(50) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.left = this.calculateScaledX(500) + "px";
        div.style.top = "60%";
        div.style.width = this.calculateScaledX(700) + "px";
        div.style.height = this.calculateScaledY(80) + "px";

        let text = "Hiscores";

        div.textContent = text;

        div.style.cursor = "pointer";

        div.addEventListener("mouseover", () => {
            div.style.color = "#F0A6F7";
        });

        div.addEventListener("mouseout", () => {
            div.style.color = "white";
        });

        this.appContainer.append(div);
    }

    drawKeys() {
        let div = document.createElement("div");

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(30) + "px";
        div.style.fontFamily = "Silkscreen";
        div.style.whiteSpace = "pre";

        div.style.top = "90%";
        div.style.width = "100%";
        div.style.height = "100%";

        let text =
            "start: down arrow   |   move: left/right arrow   |   pause: space";

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawScore() {
        let div = document.createElement("div");

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(50) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.top = "50%";
        div.style.width = "100%";
        div.style.height = "100%";

        let text = "Score: " + this.brain.lastScore;

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawScores() {
        let div = document.createElement("div");
        div.id = "hiscores";

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(50) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.left = this.calculateScaledX(650) + "px";
        div.style.top = "15%";
        div.style.width = this.calculateScaledX(400) + "px";
        div.style.height = this.calculateScaledY(500) + "px";
        div.style.whiteSpace = "pre";

        let text = "HISCORES\r\n\r\n";

        if (this.brain.scores.length != 0) {
            for (
                let index = 0;
                index < (this.brain.scores.length || 4);
                index++
            ) {
                text += this.brain.scores[index] + "\r\n";
            }
        }

        div.textContent = text;

        this.appContainer.append(div);
    }

    drawBottomText() {
        let div = document.createElement("div");

        div.style.zIndex = 11;
        div.style.position = "fixed";
        div.style.textAlign = "center";
        div.style.color = "white";
        div.style.fontSize = this.calculateScaledY(50) + "px";
        div.style.fontFamily = "Silkscreen";

        div.style.top = "80%";
        div.style.width = "100%";
        div.style.height = "100%";

        let text = "Press ENTER to continue!";

        div.textContent = text;

        this.appContainer.append(div);
    }

    draw(menu) {
        this.appContainer.innerHTML = "";
        this.setScreenDimensions();

        switch (menu) {
            case "game":
                this.drawPaddle(this.brain.paddle);
                this.drawBall(this.brain.ball);
                this.drawAllBricks();
                this.drawScoreboard();
                break;
            case "pause":
                this.drawPaddle(this.brain.paddle);
                this.drawBall(this.brain.ball);
                this.drawAllBricks();
                this.drawScoreboard();
                this.drawPause();
                break;
            case "over":
                this.drawOver();
                this.drawScore();
                this.drawBottomText();
                break;
            case "main":
                this.drawLogo();
                this.drawPlay();
                this.drawHiscores();
                this.drawKeys();
                break;
            case "hiscores":
                this.drawScores();
                this.drawBottomText();
                break;
        }
    }
}
