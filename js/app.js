import Brain from "./brain.js";
import UI from "./ui.js";

function validateIndexHtml() {
    if (document.querySelectorAll("#app").length != 1) {
        throw Error("More or less than one div with id 'app' found!");
    }
    if (document.querySelectorAll("div").length != 1) {
        throw Error("More or less than one div found in index.html!");
    }
}

function main() {
    validateIndexHtml();
    let appDiv = document.querySelector("#app");
    let brain = new Brain();
    let ui = new UI(brain, appDiv);
    let paused = false;
    let started = false;
    let currentMenu = "main";

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft":
                if (!paused && currentMenu == "game") {
                    brain.startMovePaddle(brain.paddle, -1);
                }
                break;
            case "ArrowRight":
                if (!paused && currentMenu == "game") {
                    brain.startMovePaddle(brain.paddle, 1);
                }
                break;
            case "ArrowDown":
                if (!started && currentMenu == "game") {
                    started = true;
                    brain.moveBall();
                }
                break;
            case " ":
                if (paused && started && currentMenu == "pause") {
                    console.log("Okay, les go!");
                    currentMenu = "game";
                    paused = false;
                    brain.moveBall();
                } else if (!paused && started && currentMenu == "game") {
                    console.log("Paused!");
                    currentMenu = "pause";
                    paused = true;
                    brain.stopBall(true);
                }
                break;
            case "Enter":
                if (currentMenu == "over" || currentMenu == "hiscores") {
                    currentMenu = "main";
                } else if (currentMenu == "main") {
                    console.log("Start game");
                    currentMenu = "game";
                }
                break;
        }
    });

    document.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "ArrowLeft":
                brain.stopMovePaddle(brain.paddle, -1);
                break;
            case "ArrowRight":
                brain.stopMovePaddle(brain.paddle, 1);
                break;
        }
    });

    document.addEventListener("click", (e) => {
        const target = e.target;

        if (target.id === "start") {
            handleStartClick();
        }

        if (target.id === "hiscores") {
            handleHiscoresClick();
        }
    });

    function handleStartClick() {
        console.log("Start game");
        currentMenu = "game";
    }

    function handleHiscoresClick() {
        console.log("Hiscores");
        currentMenu = "hiscores";
    }

    function checkState(brain) {
        setTimeout(() => {
            let gameState = brain.gameState();
            switch (gameState) {
                case "lvlUp":
                    started = false;
                    brain.nextLevel();
                    break;
                case "endGame":
                    started = false;
                    currentMenu = "over";
                    brain.endGame();
                    break;
            }
            checkState(brain);
        }, 5);
    }

    let mainLoaded = false;

    function uiDrawRepeater(ui) {
        setTimeout(() => {
            if (!mainLoaded && currentMenu == "main") {
                mainLoaded = true;
                ui.draw(currentMenu);
            } else if (currentMenu != "main") {
                mainLoaded = false;
                ui.draw(currentMenu);
            }
            uiDrawRepeater(ui, currentMenu);
        }, 10);
    }

    uiDrawRepeater(ui, currentMenu);
    checkState(brain);
}
// =============== ENTRY POINT ================
console.log("Breikaut startup...");
main();
