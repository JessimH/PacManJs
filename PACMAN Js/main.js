const url = 'users.php';
const ul = document.querySelector('ul')
const save =  document.querySelector('input[type="submit"]');
const message = document.querySelector('.message');
const map = document.querySelector('.map');
const pacMan = document.querySelector('img[src="assets/images/pacman.gif"]');
const redGhost = document.querySelector('img[src="assets/images/redghost.png"]');
const blueGhost = document.querySelector('img[src="assets/images/blueghost.png"]');
const pinkGhost = document.querySelector('img[src="assets/images/pinkghost.png"]');
const startGame = document.querySelector('.play');
const inputName = document.querySelector('input[type="text"]');
const input = document.querySelector('.Input');
const endScreen = document.querySelector('.loser');
const nG = document.querySelector('.nG');


let pacManInterval;
let redGhostInterval;
let currentRedGhostDirection;
let blueGhostInterval;
let currentBlueGhostDirection;
let pinkGhostInterval;
let currentPinkGhostDirection;
let score = 0;
let level = 1;
let userScore = 0;
let posts = [];

//PARTIE JSON

window.fetch(url).then(
    result => result.json()
).then(
    json => {
        console.log(json);
        posts = json.reverse()
        const postsList = posts.map(post => {
            console.log(post);
            return `<li>${post.name}:  ${post.score}</li>`
        });
        const ulContent = postsList.join('');
        ul.innerHTML = ulContent;
    }
).catch(
    error => console.log(error)
);

save.addEventListener('click', event => {
    event.preventDefault()

    const name = inputName.value;
    const score = userScore;
    const user_id = 1;
    inputName.value = '';
    userScore.value = '';

    fetch('users.php', {
        method: 'POST',
        body: JSON.stringify({
            name,
            score,
            user_id
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(
            response => response.json()
        ).then(
        json => {
            console.log(json)

            if (json.error){
                message.innerHTML = json.error;
            } else {

                posts = [json.newPost, ...posts];

                const postsList = posts.map(post => `<li>${post.name} ${post.score} (user #${ post.user_id })</li>`);
                const ulContent = postsList.join('');
                ul.innerHTML = ulContent;

                message.innerHTML = json.message;
            }
        }
    ).catch(
        error => console.error(error)
    )
})



//GAME



const directions = ['toLeft', 'toRight', 'toTop', 'toBottom']

const blockedSquaresToLeft = [
    { top: 300, left: 200 }, { top: 500, left: 200 }, { top: 700, left: 200 }, { top: 200, left: 300 }, { top: 300, left: 300 }, { top: 400, left: 400 }, { top: 500, left: 300 }, { top: 800, left: 300 },
    { top: 0, left: 500 }, { top: 200, left: 500 }, { top: 600, left: 500 }, { top: 800, left: 500 }, { top: 400, left: 600 }, { top: 200, left: 700 }, { top: 300, left: 700 },
    { top: 500, left: 700 }, { top: 800, left: 700 }, { top: 700, left: 800 },

    { top: 0, left: 0 }, { top: 100, left: 0 }, { top: 200, left: 0 }, { top: 600, left: 0 }, { top: 700, left: 0 }, { top: 800, left: 0 }, { top: 900, left: 0 }
]

const blockedSquaresToRight = [
    { top: 700, left: 100 }, { top: 200, left: 200 }, { top: 300, left: 200 }, { top: 400, left: 500 }, { top: 500, left: 200 }, { top: 800, left: 200 }, { top: 400, left: 300 },
    { top: 0, left: 400 }, { top: 200, left: 400 }, { top: 600, left: 400 }, { top: 800, left: 400 }, { top: 200, left: 600 }, { top: 300, left: 600 },
    { top: 500, left: 600 }, { top: 800, left: 600 }, { top: 300, left: 700 }, { top: 500, left: 700 }, { top: 700, left: 700 },

    { top: 0, left: 900 }, { top: 100, left: 900 }, { top: 200, left: 900 }, { top: 600, left: 900 }, { top: 700, left: 900 },
    { top: 800, left: 900 }, { top: 900, left: 900 }
]

const blockedSquaresToTop = [
    { top: 400, left: 0 }, { top: 600, left: 0 }, { top: 800, left: 0 }, { top: 100, left: 100 }, { top: 200, left: 100 }, { top: 400, left: 100 }, { top: 400, left: 400 },
    { top: 400, left: 500 }, { top: 600, left: 100 }, { top: 400, left: 100 }, { top: 700, left: 100 }, { top: 900, left: 100 }, { top: 900, left: 200 },
    { top: 100, left: 300 }, { top: 300, left: 300 }, { top: 700, left: 300 }, { top: 900, left: 300 }, { top: 200, left: 400 }, { top: 500, left: 400 },
    { top: 600, left: 400 }, { top: 800, left: 400 }, { top: 200, left: 500 }, { top: 500, left: 500 }, { top: 600, left: 500 }, { top: 800, left: 500 },
    { top: 100, left: 600 }, { top: 300, left: 600 }, { top: 700, left: 600 }, { top: 900, left: 600 }, { top: 900, left: 700 }, { top: 100, left: 800 },
    { top: 200, left: 800 }, { top: 400, left: 800 }, { top: 600, left: 800 }, { top: 700, left: 800 }, { top: 900, left: 800 }, { top: 400, left: 900 },
    { top: 600, left: 900 }, { top: 800, left: 900 },

    { top: 0, left: 0 }, { top: 0, left: 100 }, { top: 0, left: 200 }, { top: 0, left: 300 }, { top: 0, left: 400 }, { top: 0, left: 500 }, { top: 0, left: 600 },
    { top: 0, left: 700 }, { top: 0, left: 800 }, { top: 0, left: 900 }
]

const blockedSquaresToBottom = [
    { top: 200, left: 0 }, { top: 400, left: 0 }, { top: 700, left: 0 }, { top: 0, left: 100 }, { top: 100, left: 100 }, { top: 200, left: 100 }, { top: 400, left: 100 },
    { top: 400, left: 400 }, { top: 400, left: 500 }, { top: 600, left: 100 }, { top: 800, left: 100 }, { top: 800, left: 200 }, { top: 0, left: 300 }, { top: 200, left: 300 },
    { top: 600, left: 300 }, { top: 800, left: 300 }, { top: 100, left: 400 }, { top: 300, left: 400 }, { top: 500, left: 400 }, { top: 700, left: 400 }, { top: 100, left: 500 },
    { top: 300, left: 500 }, { top: 500, left: 500 }, { top: 700, left: 500 }, { top: 0, left: 600 }, { top: 200, left: 600 }, { top: 600, left: 600 }, { top: 800, left: 600 },
    { top: 800, left: 700 }, { top: 0, left: 800 }, { top: 100, left: 800 }, { top: 200, left: 800 }, { top: 400, left: 800 }, { top: 600, left: 800 }, { top: 800, left: 800 },
    { top: 200, left: 900 }, { top: 400, left: 900 }, { top: 700, left: 900 },

    { top: 900, left: 0 }, { top: 900, left: 100 }, { top: 900, left: 200 }, { top: 900, left: 300 }, { top: 900, left: 400 }, { top: 900, left: 500 }, { top: 900, left: 600 },
    { top: 900, left: 700 }, { top: 900, left: 800 }, { top: 900, left: 900 }
]

const getPositionOf = (element) => {
    const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
    const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
    return { top, left }
}

const getDelta = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pacManPosition = getPositionOf(pacMan)
    if (level >= 2) {
        const top = pacManPosition.top - redGhostPosition.top
        const left = pacManPosition.left - redGhostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    } else if (level >= 3) {
        const top = pacManPosition.top - blueGhostPosition.top
        const left = pacManPosition.left - blueGhostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    }
    if (level >= 4) {
        const top = pacManPosition.top - pinkGhostPosition.top
        const left = pacManPosition.left - pinkGhostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    }
}

const isTheCharacterBlocked = (characterPositon, movingDirection) => {
    let blockedSquares
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft
            break
        case 'toRight':
            blockedSquares = blockedSquaresToRight
            break
        case 'toTop':
            blockedSquares = blockedSquaresToTop
            break
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom
            break
    }

    return blockedSquares.some(square => {
        const topsAreEquals = characterPositon.top === square.top
        const leftsAreEquals = characterPositon.left === square.left
        return topsAreEquals && leftsAreEquals
    })
}

const movePacMan = (to) => {
    clearInterval(pacManInterval)

    pacMan.className = to

    let pacManPosition = getPositionOf(pacMan)

    pacManInterval = setInterval(() => {
        if (!isTheCharacterBlocked(pacManPosition, to)) {
            switch (to) {
                case 'toLeft':
                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" : pacManPosition.left - 100 + "px"
                    break
                case 'toRight':
                    pacMan.style.left = pacManPosition.left === 900 ? 0 : pacManPosition.left + 100 + "px"
                    break
                case 'toTop':
                    pacMan.style.top = pacManPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    pacMan.style.top = pacManPosition.top + 100 + "px"
                    break
            }
            pacManPosition = getPositionOf(pacMan)
            const dots = document.querySelectorAll('.dot')
            dots.forEach((dot) => {
                const dotPosition = getPositionOf(dot)
                if ((dotPosition.top === pacManPosition.top) && (dotPosition.left === pacManPosition.left)) {
                    map.removeChild(dot)
                    score++
                    userScore++
                    document.getElementById('score').innerHTML = " " + score
                    document.getElementById('userScore').innerHTML = " " + userScore

                    if (score === 90 * level) {
                        level++
                        document.getElementById('level').innerHTML = level
                        displayDots()
                    }
                }
            })
            isGameOver()
        }
    }, 200)
}

const movePinkGhost = () => {
    clearInterval(pinkGhostInterval)

    let pinkGhostPosition = getPositionOf(pinkGhost)

    const randomInt = Math.floor(Math.random() * 4)

    const randomDirection = directions[randomInt]

    pinkGhostInterval = setInterval(() => {
        currentPinkGhostDirection = randomDirection
        if (!isTheCharacterBlocked(pinkGhostPosition, randomDirection)) {
            switch (randomDirection) {
                case 'toLeft':
                    pinkGhost.style.left = pinkGhostPosition.left === 0 ? 900 + "px" : pinkGhostPosition.left - 100 + "px"
                    break
                case 'toRight':
                    pinkGhost.style.left = pinkGhostPosition.left === 900 ? 0 : pinkGhostPosition.left + 100 + "px"
                    break
                case 'toTop':
                    pinkGhost.style.top = pinkGhostPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    pinkGhost.style.top = pinkGhostPosition.top + 100 + "px"
                    break
            }
            pinkGhostPosition = getPositionOf(pinkGhost)
        } else {
            movePinkGhost()
            return
        }
        isGameOver()
    }, 250)
}

const moveBlueGhost = () => {
    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)

    const randomInt = Math.floor(Math.random() * 4)

    const randomDirection = directions[randomInt]

    blueGhostInterval = setInterval(() => {
        currentBlueGhostDirection = randomDirection
        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            switch (randomDirection) {
                case 'toLeft':
                    blueGhost.style.left = blueGhostPosition.left === 0 ? 900 + "px" : blueGhostPosition.left - 100 + "px"
                    break
                case 'toRight':
                    blueGhost.style.left = blueGhostPosition.left === 900 ? 0 : blueGhostPosition.left + 100 + "px"
                    break
                case 'toTop':
                    blueGhost.style.top = blueGhostPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    blueGhost.style.top = blueGhostPosition.top + 100 + "px"
                    break
            }
            blueGhostPosition = getPositionOf(blueGhost)
        } else {
            moveBlueGhost()
            return
        }
        isGameOver()
    }, 250)
}

const moveRedGhost = () => {
    clearInterval(redGhostInterval)

    let redGhostPosition = getPositionOf(redGhost)
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt]
    if (!isGameOver()) {
        redGhostInterval = setInterval(() => {
            currentRedGhostDirection = randomDirection

            if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {

                switch (randomDirection) {
                    case 'toLeft':
                        redGhost.style.left = redGhostPosition.left === 0 ? 900 + "px" : redGhostPosition.left - 100 + "px"
                        break
                    case 'toRight':
                        redGhost.style.left = redGhostPosition.left === 900 ? 0 : redGhostPosition.left + 100 + "px"
                        break
                    case 'toTop':
                        redGhost.style.top = redGhostPosition.top - 100 + "px"
                        break
                    case 'toBottom':
                        redGhost.style.top = redGhostPosition.top + 100 + "px"
                        break
                }
                redGhostPosition = getPositionOf(redGhost)
            } else {
                moveRedGhost()
                return
            }
            isGameOver()
        }, 250)
    }
}

startGame.addEventListener('click', (e) => {
    e.preventDefault()
    start()
    input.style.display = "none"
    map.style.display = "block"
    endScreen.style.display = "none"


    document.getElementById('level').innerHTML = level
})

nG.addEventListener('click', (e) => {
    e.preventDefault()
    start()
    input.style.display = "block"
    map.style.display = "block"
    endScreen.style.display = "none"

    document.getElementById('pseudo').innerHTML = userName
    document.getElementById('level').innerHTML = level
})



addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft')
            break
        case 39:
            movePacMan('toRight')
            break
        case 38:
            movePacMan('toTop')
            break
        case 40:
            movePacMan('toBottom')
            break
    }
})

let displayDots = () => {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.style.left = col * 100 + 'px'
            dot.style.top = row * 100 + 'px'
            map.insertBefore(dot, pacMan)
        }
    }
    map.removeChild(map.children[3])
    map.removeChild(map.children[12])
    map.removeChild(map.children[4])
    map.removeChild(map.children[12])
    map.removeChild(map.children[40])
    map.removeChild(map.children[49])
    map.removeChild(map.children[77])
    map.removeChild(map.children[86])
    map.removeChild(map.children[78])
    map.removeChild(map.children[86])
}

const start = () => {
    moveRedGhost()
    moveBlueGhost()
    movePinkGhost()
    displayDots()
}

const isGameOver = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pacManPosition = getPositionOf(pacMan)
    const GameColumn = document.querySelector('.Container')
    if ((redGhostPosition.top === pacManPosition.top && redGhostPosition.left === pacManPosition.left) ||
        (pinkGhostPosition.top === pacManPosition.top && pinkGhostPosition.left === pacManPosition.left) ||
        (blueGhostPosition.top === pacManPosition.top && blueGhostPosition.left === pacManPosition.left)) {
        redGhost.style.display = "none"
        blueGhost.style.display = "none"
        pinkGhost.style.display = "none"
        pacMan.style.left = "500" + 'px'
        pacMan.style.top = "400" + 'px'
        pacMan.style.display = "none"
        endScreen.style.display = "block"
        endScreen.style.display = "flex"

        return true
    }
    return false
}