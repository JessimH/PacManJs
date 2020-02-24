const pacMan = document.querySelector('img[src="assets/images/pacman.gif"]');
const map = document.querySelector('.map');

const blueGhost = document.querySelector('img[src="assets/images/blueghost.png"]');
const pinkGhost = document.querySelector('img[src="assets/images/pinkghost.png"]');
const redGhost = document.querySelector('img[src="assets/images/redghost.png"]');

let score = 0;

let pacManInterval;

let redGhostInterval;
let blueGhostInterval;
let pinkGhostInterval;

let currentRedGhostDirection;

const directions = ['toLeft','toRight','toTop','toBottom'];

const blockedSquaresToLeft = [
    {top:0, left:0},{top:100, left:0},{top:200, left:0},{top:600, left:0},{top:700, left:0},{top:800, left:0},{top:900, left:0},
    {top:300, left:200},{top:500, left:200},{top:700, left:200},{top:200, left:300},{top:300, left:300},{top:500, left:300},{top:800, left:300},
    {top:0, left:500}, {top:200, left:500}, {top:600, left:500}, {top:800, left:500}, {top:400, left:600}, {top:200, left:700}, {top:300, left:700},
    {top:500, left:700}, {top:800, left:700}, {top:700, left:800}
];
const blockedSquaresToRight = [
    {top:700, left:100}, {top:200, left:200},  {top:300, left:200},  {top:500, left:200},  {top:800, left:200}, {top:400, left:300},
    {top:0, left:400}, {top:200, left:400}, {top:600, left:400}, {top:800, left:400}, {top:200, left:600}, {top:300, left:600},
    {top:500, left:600}, {top:800, left:600}, {top:300, left:700}, {top:500, left:700}, {top:700, left:700},
    {top:0, left:900}, {top:100, left:900}, {top:200, left:900}, {top:600, left:900}, {top:700, left:900},
    {top:800, left:900}, {top:900, left:900}
];
const blockedSquaresToTop = [
    {top:400, left:0}, {top:600, left:0}, {top:800, left:0}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100}, {top:600, left:100},
    {top:400, left:100}, {top:700, left:100}, {top:900, left:100}, {top:900, left:200}, {top:100, left:300}, {top:300, left:300},
    {top:700, left:300}, {top:900, left:300}, {top:200, left:400}, {top:500, left:400}, {top:600, left:400}, {top:800, left:400},
    {top:200, left:500}, {top:500, left:500}, {top:600, left:500}, {top:800, left:500}, {top:100, left:600}, {top:300, left:600},
    {top:700, left:600}, {top:900, left:600}, {top:900, left:700}, {top:100, left:800}, {top:200, left:800}, {top:400, left:800},
    {top:600, left:800}, {top:700, left:800}, {top:900, left:800},  {top:400, left:900}, {top:600, left:900}, {top:800, left:900} ,
    //ligne en top 0
    {top:0, left:0}, {top:0, left:100}, {top:0, left:200}, {top:0, left:300}, {top:0, left:400}, {top:0, left:500}, {top:0, left:600},
    {top:0, left:700}, {top:0, left:800}, {top:0, left:900}
];
const blockedSquaresToBottom = [
    {top:200, left:0}, {top:400, left:0}, {top:700, left:0}, {top:0, left:100}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100},
    {top:600, left:100}, {top:800, left:100}, {top:800, left:200}, {top:0, left:300}, {top:200, left:300}, {top:600, left:300}, {top:800, left:300},
    {top:100, left:400}, {top:300, left:400}, {top:500, left:400}, {top:700, left:400}, {top:100, left:500}, {top:300, left:500}, {top:500, left:500},
    {top:700, left:500}, {top:0, left:600}, {top:200, left:600}, {top:600, left:600}, {top:800, left:600}, {top:800, left:700}, {top:0, left:800},
    {top:100, left:800}, {top:200, left:800}, {top:400, left:800}, {top:600, left:800}, {top:800, left:800}, {top:200, left:900}, {top:400, left:900},
    {top:700, left:900},
    //ligne en top 900
    {top:900, left:0}, {top:900, left:100}, {top:900, left:200}, {top:900, left:300}, {top:900, left:400}, {top:900, left:500}, {top:900, left:600},
    {top:900, left:700}, {top:900, left:800}, {top:900, left:900}
];

const getPositionOf = (element) => {

    const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10);

    const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10);

    return { top, left }

};

const movePacMan = (to) => {

    clearInterval(pacManInterval);

    pacMan.className = to;

    let pacManPosition = getPositionOf(pacMan);

    // Le personnage ne bougera que s’il n’est pas bloqué contre un mur

    pacManInterval = setInterval(() => {

        if (!isTheCharacterBlocked(pacManPosition, to)) {

            switch (to) {

                case 'toLeft':

                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" :

                        pacManPosition.left - 100 + "px";

                    break;

                case 'toRight':

                    pacMan.style.left = pacManPosition.left === 900 ? 0 :

                        pacManPosition.left + 100 + "px";

                    break;

                case 'toTop':

                    pacMan.style.top = pacManPosition.top - 100 + "px";

                    break;

                case 'toBottom':

                    pacMan.style.top = pacManPosition.top + 100 + "px";

                    break

            }

            pacManPosition = getPositionOf(pacMan);
            document.querySelectorAll(".dot").forEach(function (dot) {
                if (dot.style.left === pacManPosition.left+"px" && dot.style.top === pacManPosition.top+"px" && dot.style.display !== "none") {
                    dot.style.display = "none";
                    score ++;
                    document.getElementById("score").innerHTML= score;
                }

            })

        }

    }, 180);

};

const moveRedGhost = () => {

    clearInterval(redGhostInterval);

    let redGhostPosition = getPositionOf(redGhost);

    //generer un "to" aléatoire
    // A SUPPRIMER APRES AVOIR OBTENU LE POINT
    const randomInt = Math.floor(Math.random() * 4);

    const randomDirections = directions[randomInt];

    // DEBUT DE LA SOLUTION

    // Le personnage ne bougera que s’il n’est pas bloqué contre un mur

    //currentRedGhostDirection = randomDirections;

    //let filtredDirections = directions.filter((direction) => {
        //return direction !== currentRedGhostDirection &&
   // });

    redGhostInterval = setInterval(() => {

        if (!isTheCharacterBlocked(redGhostPosition, randomDirections)) {
            currentRedGhostDirection = randomDirections;

            switch (randomDirections) {

                case 'toLeft':

                    redGhost.style.left = redGhostPosition.left === 0 ? 900 + "px" :

                        redGhostPosition.left - 100 + "px";

                    break;

                case 'toRight':

                    redGhost.style.left = redGhostPosition.left === 900 ? 0 :

                        redGhostPosition.left + 100 + "px";

                    break;

                case 'toTop':

                    redGhost.style.top = redGhostPosition.top - 100 + "px";

                    break;

                case 'toBottom':

                    redGhost.style.top = redGhostPosition.top + 100 + "px";

                    break

            }

            redGhostPosition = getPositionOf(redGhost)

        }
        else {

            moveRedGhost();
            return

        }

    }, 160);

};
const moveBlueGhost = () => {

    clearInterval(blueGhostInterval);

    let blueGhostPosition = getPositionOf(blueGhost);

    //generer un "to" aléatoire
    // A SUPPRIMER APRES AVOIR OBTENU LE POINT
    const randomInt = Math.floor(Math.random() * 4);

    const randomDirections = directions[randomInt];

    // DEBUT DE LA SOLUTION

    // Le personnage ne bougera que s’il n’est pas bloqué contre un mur

    //currentRedGhostDirection = randomDirections;

    //let filtredDirections = directions.filter((direction) => {
    //return direction !== currentRedGhostDirection &&
    // });

    blueGhostInterval = setInterval(() => {

        if (!isTheCharacterBlocked(blueGhostPosition, randomDirections)) {
            currentBlueGhostDirection = randomDirections;

            switch (randomDirections) {

                case 'toLeft':

                    blueGhost.style.left = blueGhostPosition.left === 0 ? 900 + "px" :

                        blueGhostPosition.left - 100 + "px";

                    break;

                case 'toRight':

                    blueGhost.style.left = blueGhostPosition.left === 900 ? 0 :

                        blueGhostPosition.left + 100 + "px";

                    break;

                case 'toTop':

                    blueGhost.style.top = blueGhostPosition.top - 100 + "px";

                    break;

                case 'toBottom':

                    blueGhost.style.top = blueGhostPosition.top + 100 + "px";

                    break

            }

            blueGhostPosition = getPositionOf(blueGhost)

        }
        else {

            moveBlueGhost();
            return

        }

    }, 160);

};
const movePinkGhost = () => {

    clearInterval(pinkGhostInterval);

    let pinkGhostPosition = getPositionOf(pinkGhost);

    //generer un "to" aléatoire
    // A SUPPRIMER APRES AVOIR OBTENU LE POINT
    const randomInt = Math.floor(Math.random() * 4);

    const randomDirections = directions[randomInt];

    // DEBUT DE LA SOLUTION

    // Le personnage ne bougera que s’il n’est pas bloqué contre un mur

    //currentRedGhostDirection = randomDirections;

    //let filtredDirections = directions.filter((direction) => {
    //return direction !== currentRedGhostDirection &&
    // });

    pinkGhostInterval = setInterval(() => {

        if (!isTheCharacterBlocked(pinkGhostPosition, randomDirections)) {
            currentPinkGhostDirection = randomDirections;

            switch (randomDirections) {

                case 'toLeft':

                    pinkGhost.style.left = pinkGhostPosition.left === 0 ? 900 + "px" :

                        pinkGhostPosition.left - 100 + "px";

                    break;

                case 'toRight':

                    pinkGhost.style.left = pinkGhostPosition.left === 900 ? 0 :

                        pinkGhostPosition.left + 100 + "px";

                    break;

                case 'toTop':

                    pinkGhost.style.top = pinkGhostPosition.top - 100 + "px";

                    break;

                case 'toBottom':

                    pinkGhost.style.top = pinkGhostPosition.top + 100 + "px";

                    break

            }

            pinkGhostPosition = getPositionOf(pinkGhost)

        }
        else {

            movePinkGhost();
            return

        }

    }, 160);

};

const displayDots = () => {
    for(let col = 0; col < 10; col ++)
    {
        for(let row = 0; row < 10; row++){
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left =col * 100 + 'px';
            dot.style.top =row * 100 + 'px';
            map.insertBefore(dot, pacMan)
        }
    }
};

const start = () => {
    moveRedGhost();
    moveBlueGhost();
    movePinkGhost();
    displayDots();
};

start();

addEventListener('keydown', e => {

    switch (e.keyCode) {

        case 37:

            movePacMan('toLeft');

            break;

        case 39:

            movePacMan('toRight');

            break;

        case 38:

            movePacMan('toTop');

            break;

        case 40:

            movePacMan('toBottom');

            break

    }

});

const isTheCharacterBlocked = (characterPositon, movingDirection) => {

    // Nous déterminons quel tableau est concerné par la direction prise

    let blockedSquares;

    switch (movingDirection) {

        case 'toLeft':

            blockedSquares = blockedSquaresToLeft;

            break;

        case 'toRight':

            blockedSquares = blockedSquaresToRight;

            break;

        case 'toTop':

            blockedSquares = blockedSquaresToTop;

            break;

        case 'toBottom':

            blockedSquares = blockedSquaresToBottom;

            break

    }



    // Nous retournons un booléen indiquant si la position du personnage

    // est référencéE dans le tableau

    return blockedSquares.some(square => {

        const topsAreEquals = characterPositon.top === square.top;

        const leftsAreEquals = characterPositon.left === square.left;

        return topsAreEquals && leftsAreEquals

    })

};


