let isGameOn = false;
let currentScore = 0;
let gameId = null;
let gameDuration = 30000;
let spawnInterval = 2000;
let mainContainer = document.querySelector(".main-content");
let screenHeight = screen.height;
let screenWidth = screen.width;
let eDpi = 1; //0.24;

const handleMouseMovement = (event) => {
    let x = event.x;
    let y = event.y;

    // console.log(event);

    let crosshair = document.querySelector(".crosshair");
    crosshair.setAttribute("left", `${x*eDpi}px`);
    crosshair.setAttribute("top", `${y*eDpi}px`);
};

const playGame = () => {
    if(isGameOn) {
        let randomX = Math.floor(Math.random() * screenWidth);
        let randomY = Math.floor(Math.random() * screenHeight);
        console.log({randomX, randomY});
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

    const promise = mainContainer.requestPointerLock({
        unadjustedMovement: true
    });

    promise.then( () => {
        console.log("Pointer is locked");
    });
    promise.catch((error) => {
        console.log( "Failed to lock screen with error : ", error);
    })

    document.addEventListener("mousemove", handleMouseMovement);

    setTimeout(() => {
        isGameOn = false;
        playBtn.style.display = "block";
        if(gameId)    clearInterval(gameId);
        document.exitPointerLock();
    }, 10000);
    gameId = setInterval(() => {
        playGame();
    }, 1000);
});