// SETTINGS
let placeCount = 0
let maxPlaces = 10

let randomSum = 0
let randomNumbersCount = 5

let secondGameDraw = false

let timerMinutes = 14
let timerSeconds = 59
let timerStopped = false


// FUNCTIONS
let timerH1 = document.getElementById("timer")
function timer() {
    function updateTimer() {
       if (!timerStopped) {
        let formattedMinutes = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes
        let formattedSeconds = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds
        timerH1.innerHTML = formattedMinutes + ":" + formattedSeconds

        if (timerMinutes <= -1) {
            failGame()
        } else {
            if (timerMinutes === 0 && timerSeconds === 0) {
                clearInterval(timerInterval)
                failGame()
            } else {
                if (timerSeconds === 0) {
                    timerMinutes--
                    timerSeconds = 59
                } else {
                    timerSeconds--
                }
            }
        }
       }
    }

    var timerInterval = setInterval(updateTimer, 1000)
}

function fadeOutEffect(target) {
    let fadeTarget = document.getElementById(target)
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.2
        } else {
            clearInterval(fadeEffect)
        }
    }, 50)
    setTimeout(function() {
        fadeTarget.style.display = "none"
    }, 1000)
}

function fadeInEffect(target) {
    let fadeTarget = document.getElementById(target)
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 0
        }
        if (parseFloat(fadeTarget.style.opacity) < 1) {
            fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.2
        } else {
            clearInterval(fadeEffect)
        }
    }, 50)
    fadeTarget.style.display = "block"
}

function startTimer() {
    document.getElementById("timer").style.display = "block"
    timer()
}

function moveBtn() {
    let top = Math.random() * 80
    let left = Math.random() * 80

    document.getElementById("btnKezdes").style.top = top + "%"
    document.getElementById("btnKezdes").style.left = left + "%"
}

function firstClick() {
    startTimer()
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
})

canvas.addEventListener("mousemove", drawLine)

window.addEventListener("mouseup", () => {
  isDrawing = false
})

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
let cabbage = document.createElement("span")
let ship
let hr = document.createElement("hr")
let thirdGameStatus = document.createElement("h3")
let thirdGameTable = document.createElement("table")

function throwSecondGame() {
    fadeOutEffect("secondPuzzleDiv")
    fadeInEffect("thirdPuzzleDiv")

    clearScreenSecondGame()

    createThirdGameTable()
    setupThirdGame()
}

function clearScreenSecondGame() {
    secondGameDraw = false
    for (let i = 0; i < numbers.length; i++) {
        document.body.removeChild(numbers[i])
    }
    document.body.removeChild(canvas)
    document.body.removeChild(secondGameAnswer)
}

function createThirdGameTable() {
    let idNumber = 0
    let shipCreated = false
    thirdGameTable.style.border = "1px solid white"
    thirdGameTable.style.borderRadius = "10px"
    thirdGameTable.id = "thirdGameTable"
    for (let i = 0; i < 3; i++) {
        let tr = document.createElement("tr")
        thirdGameTable.appendChild(tr)
        for (let j = 0; j < 2; j++) {
            let td = document.createElement("td")
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
}

function setupThirdGame() {
    thirdGameWillDie = 0
    thirdGameDeath = ""
    thirdGameTable.style.border = "1px solid white"
    //Tábla Létrehozása
    let thirdGameDiv = document.getElementById("thirdGameDiv")

    thirdGameDiv.appendChild(thirdGameTable)
    
    thirdGameStatus.innerHTML = ""
    thirdGameDiv.appendChild(thirdGameStatus)
    
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

    //Cabbage
    cabbage.className = "thirdGameEmojis"
    cabbage.id = "thirdGameCabbage"
    cabbage.onclick = function() {
        moveEmoji(this)
    }
    cabbage.innerHTML = "🥬"
    cabbage.name = "elore"
    document.getElementById("thirdGameTd4").appendChild(cabbage)
}

function throwThirdGame() {
    thirdGameDiv.removeChild(thirdGameTable)
}

function restartThirdGame() {
    throwThirdGame()
    setupThirdGame()
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
let secondGameAnswer = document.createElement("h4")
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
        newNumber.style.color = "rgb(15, 15, 15)"
        newNumber.style.zIndex = "-1"
        newNumber.style.backgroundColor = "transparent"

        document.body.appendChild(newNumber)

        numbers[i] = newNumber
        randomSum += randomNumber

    }

    secondGameAnswer.innerHTML = "A megoldás: " + randomSum
    secondGameAnswer.style.position = "absolute"
    secondGameAnswer.style.bottom = "0"
    secondGameAnswer.style.zIndex = "-1"
    secondGameAnswer.style.color = "rgb(15, 15, 15)"
    secondGameAnswer.style.backgroundColor = "transparent"

    document.body.appendChild(secondGameAnswer)
}

function numChange() {
    const numInput = document.getElementById("numValue")
    let value = numInput.value
    if (value == (randomSum * 2)) {
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


let thirdGameWillDie = 0
let thirdGameDeath = ""
function moveEmoji(emoji) {
    if (thirdGameWillDie <= 1) {
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

            checkThirdGame()
        } else {
            let shipLength = getSpanLength("thirdGameTdShip")
            if (shipLength == 0) {
                parentNode.removeChild(emoji)

                ship.removeChild(hr)
                ship.appendChild(emoji)
                if (emoji.name == "elore") {
                    emoji.title = "-->"
                } else {
                    emoji.title = "<--"
                }
                ship.appendChild(hr)
                checkThirdGame()
            } else {
                thirdGameError(false)
            }
        }
    } else {
        let seconds = 2
        thirdGameTable.style.pointerEvents = "none"
        thirdGameError(true)
        thirdGameStatus.innerHTML = "A játék újraindul! 3 (-1 perc)<br>" + thirdGameDeath
        timerMinutes--
        function thirdGameTimer() {
            thirdGameStatus.innerHTML = "A játék újraindul! " + seconds + " (-1 perc)<br>" + thirdGameDeath
            seconds--

            if (seconds < 0) {
                clearInterval(thirdGameTimerInterval)
                thirdGameTable.style.pointerEvents = "all"
                restartThirdGame()
            }
        }
        
        let thirdGameTimerInterval = setInterval(thirdGameTimer, 1000)
    }
}

function checkThirdGame() {
    let foxPosition = document.getElementById("thirdGameFox").parentNode.id.replace("thirdGameTd", "")
    let chickenPosition = document.getElementById("thirdGameChicken").parentNode.id.replace("thirdGameTd", "")
    let cabbagePosition = document.getElementById("thirdGameCabbage").parentNode.id.replace("thirdGameTd", "")

    if ((foxPosition % 2 == 0 && chickenPosition % 2 == 0) || (foxPosition % 2 == 1 && chickenPosition % 2 == 1)) {
        thirdGameDeath = "A róka megette a csirkét!"
        thirdGameWillDie++
    } else if ((chickenPosition % 2 == 0 && cabbagePosition % 2 == 0) || (chickenPosition % 2 == 1 && cabbagePosition % 2 == 1)) {
        thirdGameDeath = "A csirke megette a káposztát!"
        thirdGameWillDie++
    } else {
        thirdGameWillDie = 0
    }

    if (getSpanLength("thirdGameTd1") == 1 && getSpanLength("thirdGameTd3") == 1 && getSpanLength("thirdGameTd5") == 1) {
        thirdGameTable.style.border = "1px solid green"
        setTimeout(function() {
            startFourthGame()
        }, 500)
    }
}

function thirdGameError(stayRed) {
    thirdGameTable.style.border = "1px solid red"
    setTimeout(function() {
        thirdGameTable.style.border = "1px solid white"
        setTimeout(function() {
            thirdGameTable.style.border = "1px solid red"
            setTimeout(function() {
                thirdGameTable.style.border = "1px solid white"
                if (stayRed) {
                    thirdGameTable.style.border = "1px solid red"
                }
            }, 250)
        }, 250)
    }, 250)
}

function getSpanLength (id) {
    return document.getElementById(id).getElementsByTagName("span").length
}

let fourthGameStatus = document.createElement("span")
function startFourthGame() {
    fadeOutEffect("thirdPuzzleDiv")
    throwThirdGame()
    fadeInEffect("fourthPuzzleDiv")
    fourthGameQuestions(1)
    document.getElementById("fourthGameButtons").appendChild(fourthGameStatus)
}

let btn1 = document.getElementById("fourthGameButton1")
let btn2 = document.getElementById("fourthGameButton2")
let btn3 = document.getElementById("fourthGameButton3")
function fourthGameQuestions(number) {
    let question = document.getElementById("fourthGameQuestion")

    switch (number) {
        case 1: {
            question.innerHTML = "1. Hány perces a szabadulószoba?"
            btn1.value = "15:00"
            btn2.value = "15:01"
            btn3.value = "14:59"
            setGoodButton(btn1, 1)
            break
        }
        case 2: {
            question.innerHTML = "2. Melyik gombkombinációval nyitható meg az oldal forráskódja?"
            btn1.value = "CTRL + W"
            btn2.value = "CTRL + R"
            btn3.value = "CTRL + U"
            setGoodButton(btn3, 2)
            break
        }
        case 3: {
            question.innerHTML = "3. Melyik emoji található meg az oldalon?"
            btn1.value = "⏳"
            btn2.value = "🔒"
            btn3.value = "🔑"
            setGoodButton(btn2, 3)
            break
        }
        case 4: {
            question.innerHTML = `4. 41°18'14.1"N 81°54'06.1"W`
            btn1.value = "❤️"
            btn2.value = "♦️"
            btn3.value = "🔴"
            setGoodButton(btn1, 4)
            break
        }
        case 5: {
            question.innerHTML = "5. Melyik szám található meg az oldalon?"
            btn1.value = "911"
            btn2.value = "733"
            btn3.value = "1337"
            setGoodButton(btn2, 5)
            break
        }
        case 6: {
            fadeOutEffect("fourthPuzzleDiv")
            fadeInEffect("errorPuzzleDiv")
            questionWait()
        }
    }
}

function setGoodButton(button, currQuestion) {
    if (btn1 == button) {
        btn1.onclick = function() {
            goodButton(btn1, currQuestion)
        }
    } else {
        btn1.onclick = function() {
            wrongButton(btn1)
        }
    }

    if (btn2 == button) {
        btn2.onclick = function() {
            goodButton(btn2, currQuestion)
        }
    } else {
        btn2.onclick = function() {
            wrongButton(btn2)
        }
    }

    if (btn3 == button) {
        btn3.onclick = function() {
            goodButton(btn3, currQuestion)
        }
    } else {
        btn3.onclick = function() {
            wrongButton(btn3)
        }
    }
}

function wrongButton(button) {
    const errorBorder = "1px solid red"
    if (button.style.border != errorBorder) {
        button.style.border = errorBorder
        fourthGameStatus.innerHTML = "Hibás válasz! (-3 perc)"
        timerMinutes -= 3
        setTimeout(function() {
            fourthGameStatus.innerHTML = ""
        }, 1000)
    }
}

function goodButton(button, currQuestion) {
    const goodBorder = "1px solid green"
    button.style.border = goodBorder

    setTimeout(function() {
        resetButtons()
        fourthGameQuestions(currQuestion + 1)
    }, 500)
}

function resetButtons() {
    btn1.style.border = "1px solid white"
    btn2.style.border = "1px solid white"
    btn3.style.border = "1px solid white"
}

function questionWait() {
    setTimeout(function() {
        document.getElementById("errorPuzzleH1").innerHTML = "Feladat hiba észlelve!<br>Feladat átugrása..."
        setTimeout(function() {
            fadeOutEffect("errorPuzzleDiv")
            fadeInEffect("fifthPuzzleDiv")
            fifthGame()
        }, 3000)
    }, 10000)
}

function fifthGame() {
    timerH1.onclick = function() {
        let formattedMinutes = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes
        let formattedSeconds = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds

        timerStopped = true
        timerMinutes = 0
        timerSeconds = 0

        timerH1.innerHTML = formattedMinutes + ":" + formattedSeconds
        timerH1.style.color = "red"
        setTimeout(function() {
            fadeOutEffect("fifthPuzzleDiv")
            fadeInEffect("endGame")
            setTimeout(function() {
                fadeOutEffect("endGame")
                fadeOutEffect("timer")
            }, 5000)
        }, 1000)
    }
}

function failGame() {
    timerH1.innerHTML = "Lejárt az idő!"
    timerH1.style.color = "red"

    timerStopped = true
    timerMinutes = 0
    timerSeconds = 0

    if (secondGameDraw) { clearScreenSecondGame() }

    fadeOutEffect("firstPuzzleDiv")
    fadeOutEffect("secondPuzzleDiv")
    fadeOutEffect("thirdPuzzleDiv")
    fadeOutEffect("fourthPuzzleDiv")
    fadeOutEffect("fifthPuzzleDiv")
    fadeOutEffect("endGame")

    fadeInEffect("failGame")
    setTimeout(function() {
        fadeOutEffect("failGame")
        fadeOutEffect("timer")
    }, 5000)
}