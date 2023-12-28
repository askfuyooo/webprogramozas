// SETTINGS
let placeCount = 0
let maxPlaces = 1

let randomSum = 0
let randomNumbersCount = 3

let timerCountDown = 15
let secondGameDraw = false


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

//SECOND PUZZLE
let isDrawing = false
let startX, startY

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true
  startX = e.clientX
  startY = e.clientY
});

canvas.addEventListener("mousemove", drawLine);

window.addEventListener("mouseup", () => {
  isDrawing = false
});

function drawLine(e) {
  if (!isDrawing || !secondGameDraw) return

  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(e.clientX, e.clientY)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 15
  ctx.lineCap = "round"
  ctx.stroke()

  startX = e.clientX
  startY = e.clientY
}

function startSecondGame() {
    fadeOutEffect("firstPuzzleDiv")
    fadeInEffect("secondPuzzleDiv")
    secondGameDraw = true
    secondGameRandomNumbers()
}

function throwSecondGame() {
    fadeOutEffect("secondPuzzleDiv")
    fadeInEffect("thirdPuzzleDiv")

    secondGameDraw = false
    for (let i = 0; i < numbers.length; i++) {
        document.body.removeChild(numbers[i])
    }
    document.body.removeChild(canvas)
}

// PUZZLES
function firstPuzzle() {
    if (placeCount != maxPlaces) {
        moveBtn()
        placeCount++
        document.body.focus()
    } else {
        document.getElementById("btnKezdes").setAttribute("onclick", "startSecondGame()")
    }
}

let numbers = new Array(randomNumbersCount)
function secondGameRandomNumbers() {

    const max = 1000
    const min = 1

    for (let i = 0; i < numbers.length; i++) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        
        let top = Math.floor(Math.random() * (71 - 10) + 10)
        let left = Math.floor(Math.random() * (71 - 10) + 10)

        let newNumber = document.createElement("h3")
        newNumber.innerHTML = randomNumber
        newNumber.style.position = "absolute"
        newNumber.style.top = top + "%"
        newNumber.style.left = left + "%"
        newNumber.style.color = "white" //rgb(15, 15, 15) TÖRÖL
        newNumber.style.zIndex = "-1"
        newNumber.style.backgroundColor = "transparent"

        document.body.appendChild(newNumber)

        numbers[i] = newNumber
        randomSum += randomNumber

    }

    console.log(randomSum) //TÖRÖL
}

function numChange() {
    const numInput = document.getElementById("numValue")
    let value = numInput.value
    if (value == randomSum) {
        numInput.style.border = "5px solid green"
        setTimeout(function() {
            throwSecondGame()
        }, 500)
    } else {
        numInput.style.border = "5px solid red"
    }
}