let isGameOn = false;
let currentScore = 0;
let gameId = null;
let gameDuration = 30000;
let spawnInterval = 2000;
let mainContainer = document.querySelector(".main-content");
let screenHeight = screen.height;
let screenWidth = screen.width;

const playGame = () => {
    if(isGameOn) {
        let randomX = Math.floor(Math.random() * screenWidth);
        let randomY = Math.floor(Math.random() * screenHeight);
        console.log({randomX, randomY});
        let target= document.createElement("div");
        target.classList.add("target-class");
        //target.style.top = randomY;
        
        target.style.top = randomY + 'px';
        target.style.left = randomX + 'px';
        // target.setAttribute("top", `${randomY}`);
        // target.setAttribute("left", `${randomX}`);
        mainContainer.appendChild(target);
        setTimeout(() => {
            target.style.display = "none";
            mainContainer.removeChild(target);
            if(gameId)    clearInterval(gameId);
        }, 2000);
    }
};

let playBtn = document.querySelector("#play-btn");

playBtn.addEventListener("click", (event) => {
    playBtn.style.display = "none";
    isGameOn = true;
    setTimeout(() => {
        isGameOn = false;
        playBtn.style.display = "block";
    }, 10000);
    gameId = setInterval(() => {
        playGame();
    }, 1000);
});