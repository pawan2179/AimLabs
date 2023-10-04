let isGameOn = false;
let currentScore = 0;
let gameId = null;
let gameDuration = 30000;
let spawnInterval = 2000;
let mainContainer = document.querySelector(".main-content");
let screenHeight = screen.height;
let screenWidth = screen.width;
let mainContainerWidth = mainContainer.clientWidth;
let mainContainerHeight = mainContainer.clientHeight;

let minX = Math.floor ((screenWidth - mainContainerWidth) / 2);
let minY = Math.floor ((screenHeight - mainContainerHeight) / 2);
let maxX = mainContainerWidth;
let maxY = mainContainerHeight;
let eDpi = 1;
let crossHairPlace = null;

const handleMouseMovement = (event) => {
    if(isGameOn) {
        let x = event.x;
        let y = event.y;

        let crosshair = document.querySelector(".crosshair");
        crosshair.style.left = `${x*eDpi}px`;
        crosshair.style.top = `${y*eDpi}px`;
    }
};

const resetCrosshair = () => {
    let crosshair = document.querySelector(".crosshair");
    crosshair.style.left = Math.floor(screenWidth / 2);
    crosshair.style.top = Math.floor(screenHeight / 2);
}

const playGame = () => {
    if(isGameOn) {
        let randomX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
        let randomY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
        // console.log({randomX, randomY});
        let target= document.createElement("div");
        target.classList.add("target-class");
        target.classList.add("scale-target");
        
        target.style.top = randomY + 'px';
        target.style.left = randomX + 'px';

        mainContainer.appendChild(target);
        setTimeout(() => {
            target.style.display = "none";
            mainContainer.removeChild(target);
        }, 2000);
    }
};

let playBtn = document.querySelector("#play-btn");

playBtn.addEventListener("click", (event) => {
    playBtn.style.display = "none";
    isGameOn = true;

    prevX = (Math.floor(screenWidth / 2));
    prevY = (Math.floor(screenHeight / 2));
    document.addEventListener("mousemove", handleMouseMovement);

    setTimeout(() => {
        isGameOn = false;
        playBtn.style.display = "block";
        if(gameId)    clearInterval(gameId);
        // document.exitPointerLock();
        document.removeEventListener("mousemove", resetCrosshair);
    }, 10000);
    gameId = setInterval(() => {
        playGame();
    }, 1000);
});