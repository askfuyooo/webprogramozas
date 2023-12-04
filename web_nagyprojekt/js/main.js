// SETTINGS
let placeCount = 0
let maxPlaces = 1
let timerCountDown = 15


//Cursor

let altTabbed = false
document.addEventListener("mousemove", (e) => {
    const cursor = document.getElementById("cursor")
    const offsetX = e.movementX
    const offsetY = e.movementY

    const currLeft = parseInt(getComputedStyle(cursor).left)
    const currTop = parseInt(getComputedStyle(cursor).top)

    cursor.style.left = `${currLeft + offsetX}px`
    cursor.style.top = `${currTop + offsetY}px`
})

// FUNCTIONS
function timer() {
    let timerH1 = document.getElementById("timer")
    let countDownDate = new Date().getTime() + timerCountDown * 60 * 1000
    let x = setInterval(function() {

    let now = new Date().getTime()
    let distance = countDownDate - now
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    let zeroMin = ""
    if (minutes <= 9) {
        zeroMin = "0"
    }

    let zeroSec = ""
    if (seconds <= 9) {
        zeroSec = "0"
    }

    timerH1.innerHTML = zeroMin + minutes + ":" + zeroSec + seconds

    if (distance < 0) {
        clearInterval(x)
        timerH1.innerHTML = "LEJÁRT"
        timerH1.style.color = "red"
    }
    }, 1000)
}

function fadeOutEffect(target) {
    let fadeTarget = document.getElementById(target);
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
    setTimeout(function() {
        fadeTarget.style.display = "none"
    }, 1000)
}

function fadeInEffect(target) {
    let fadeTarget = document.getElementById(target);
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 0;
        }
        if (parseFloat(fadeTarget.style.opacity) < 1) {
            fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.2;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
    fadeTarget.style.display = "block"
}


function moveBtn() {
    let top = Math.random() * 80
    let left = Math.random() * 80

    document.getElementById("btnKezdes").style.top = top + "%"
    document.getElementById("btnKezdes").style.left = left + "%"
}

function firstClick() {
    document.getElementById("timer").style.display = "block"
    timer()

    document.getElementById("btnKezdes").removeAttribute("onclick")
    document.getElementById("btnKezdes").setAttribute("onmouseover", "firstPuzzle()")
    document.getElementById("btnKezdes").style.backgroundColor = "rgb(41, 41, 41)"
    document.getElementById("btnKezdes").style.color = "white"
    document.getElementById("firstPuzzleH1").innerHTML = "1. A kezdéshez kattintson a gombra!"
    moveBtn()
}

function startGame() {
    fadeOutEffect("firstPuzzleDiv")
    fadeInEffect("secondPuzzleDiv")
}



// PUZZLES
function firstPuzzle() {
    if (placeCount != maxPlaces) {
        moveBtn()
        placeCount++
        document.body.focus()
    } else {
        document.getElementById("btnKezdes").setAttribute("onclick", "startGame()")
    }
}