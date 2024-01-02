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

let chicken = document.createElement("span")
let fox = document.createElement("span")
let farmer = document.createElement("span")
let ship
let hr = document.createElement("hr")

function throwSecondGame() {
    fadeOutEffect("secondPuzzleDiv")
    fadeInEffect("thirdPuzzleDiv")

    secondGameDraw = false
    for (let i = 0; i < numbers.length; i++) {
        document.body.removeChild(numbers[i])
    }
    document.body.removeChild(canvas)
    
    //Tábla Létrehozása
    let thirdGameDiv = document.getElementById("thirdGameDiv")
    let thirdGameTable = document.createElement("table")
    thirdGameTable.style.border = "1px solid black"
    let idNumber = 0
    let shipCreated = false

    for (let i = 0; i < 3; i++) {
        let tr = document.createElement("tr")
        thirdGameTable.appendChild(tr)
        for (let j = 0; j < 2; j++) {
            let td = document.createElement("td")
            //td.innerHTML = idNumber //TÖRÖL
            td.id = "thirdGameTd" + idNumber
            idNumber++
            tr.appendChild(td)
            if (!shipCreated) {
                let td = document.createElement("td")
                td.appendChild(hr)
                td.id = "thirdGameTdShip"
                td.rowSpan = "3"
                tr.appendChild(td)
                shipCreated = true
                ship = td
            }
        }
    }
    thirdGameDiv.appendChild(thirdGameTable)
    
    //Tábla feltöltése
    //Csirke
    chicken.className = "thirdGameEmojis"
    chicken.id = "thirdGameChicken"
    chicken.onclick = function() {
        moveEmoji(this)
    }
    chicken.innerHTML = "🐔"
    chicken.name = "elore"
    document.getElementById("thirdGameTd0").appendChild(chicken)

    //Róka
    fox.className = "thirdGameEmojis"
    fox.id = "thirdGameFox"
    fox.onclick = function() {
        moveEmoji(this)
    }
    fox.innerHTML = "🦊"
    fox.name = "elore"
    document.getElementById("thirdGameTd2").appendChild(fox)

    //Farmer
    farmer.className = "thirdGameEmojis"
    farmer.id = "thirdGameFarmer"
    farmer.onclick = function() {
        moveEmoji(this)
    }
    farmer.innerHTML = "👨‍🌾"
    farmer.name = "elore"
    document.getElementById("thirdGameTd4").appendChild(farmer)
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
    } else if (value == "") {
        numInput.style.border = "1px solid white"
    }
    else {
        numInput.style.border = "5px solid red"
    }
}

function moveEmoji(emoji) {
    let parentNode = document.getElementById(emoji.parentNode.id)
    if (parentNode.id == "thirdGameTdShip") {
        emoji.title = ""
        let freeCell
        if (emoji.name == "elore") {
            if (getSpanLength("thirdGameTd1") == 0) {
                freeCell = document.getElementById("thirdGameTd1")
            } else if (getSpanLength("thirdGameTd3") == 0) {
                freeCell = document.getElementById("thirdGameTd3")
            } else if (getSpanLength("thirdGameTd5") == 0) {
                freeCell = document.getElementById("thirdGameTd5")
            } else {
                console.error("Kritikus hiba!")
            }
            emoji.name = "hatra"
        } else {
            if (getSpanLength("thirdGameTd0") == 0) {
                freeCell = document.getElementById("thirdGameTd0")
            } else if (getSpanLength("thirdGameTd2") == 0) {
                freeCell = document.getElementById("thirdGameTd2")
            } else if (getSpanLength("thirdGameTd4") == 0) {
                freeCell = document.getElementById("thirdGameTd4")
            } else {
                console.error("Kritikus hiba!")
            }
            emoji.name = "elore"
        }

        parentNode.removeChild(emoji)
        freeCell.appendChild(emoji)
    } else {
        let shipLength = getSpanLength("thirdGameTdShip")
        if (shipLength <= 1) {
            parentNode.removeChild(emoji)

            ship.removeChild(hr)
            ship.appendChild(emoji)
            if (emoji.name == "elore") {
                emoji.title = "-->"
            } else {
                emoji.title = "<--"
            }
            ship.appendChild(hr)
        } else {
            //PIROS BORDER
        }
    }
}

function getSpanLength (id) {
    return document.getElementById(id).getElementsByTagName("span").length
}