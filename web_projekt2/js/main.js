let sorok = 0
let cellak = 0
let tt = new Array(sorok)
let ujSor
let lepesek = 0
let szorzo = 0

function init() {
    let meretek = 0
    let elfogadva = false
    do
    {
        meretek = prompt("Adja meg a pálya méreteit! (min.: 5)")
        if (isFinite(meretek) && meretek >= 5 && meretek != null && meretek != undefined) {
            let table = document.getElementById("palya")
            table.style.width = meretek * 50 + "px"
            table.style.height = meretek * 50 + "px"
            sorok = meretek
            cellak = meretek
            szorzo = meretek - 2
            elfogadva = true
        }
    } while (!elfogadva)

    for (let i = 0; i < sorok; i++) {
        ujSor = document.getElementById("palya").insertRow(i)
        tt[i] = new Array(cellak)
        for (let j = 0; j < cellak; j++){
            tt[i][j] = ujSor.insertCell(j)
            tt[i][j].id = i * cellak + j
            tt[i][j].onclick = function() { cellClicked(this) }
            tt[i][j].style.width = "50px"
            tt[i][j].style.height = "50px"
            tt[i][j].style.color = "#fcfcfc"
            tt[i][j].style.background = "#999999"
            tt[i][j].innerHTML=""
        }
    }

    /*
    for (let i=0; i<figure_cell_list.length; i++)
    {
        let trow=figure_cell_list[i][0];
        let tcol=figure_cell_list[i][1];
        let tfigure=figure_cell_list[i][2];
        tt[trow][tcol].innerHTML=tfigure;
    }
    */
}

function clearBackground()
{
    for (let i = 0; i < sorok; i++) {
        for (let j = 0; j < cellak; j++) {
            tt[i][j].style.background = "#999999"
        }
    }
}

function cellClicked(obj) {   
    let lepesekSzama = 0
    let sor = parseInt(obj.id / cellak)
    let oszlop = obj.id % cellak
    let kivalasztott = tt[sor][oszlop]
    let color = "lightgray"
    if (kivalasztott.innerHTML == "" || lepesek == 0) {
        if (kivalasztott.style.background == color || lepesek == 0) {
            kivalasztott.style.background = "#777777"
            clearBackground()
            document.getElementById("subText").style.display = "none"
            for (let i = 2; i <= 2; i++) {
                for (let j = 1; j < 2; j++) {
                    if (tt[sor + i] && tt[sor + i][oszlop + j] && tt[sor + i][oszlop + j].innerHTML == "") {tt[sor + i][oszlop + j].style.background = color; lepesekSzama++;}
                    if (tt[sor + i] && tt[sor + i][oszlop - j] && tt[sor + i][oszlop - j].innerHTML == "") {tt[sor + i][oszlop - j].style.background = color; lepesekSzama++;}
                    if (tt[sor - i] && tt[sor - i][oszlop + j] && tt[sor - i][oszlop + j].innerHTML == "") {tt[sor - i][oszlop + j].style.background = color; lepesekSzama++;}
                    if (tt[sor - i] && tt[sor - i][oszlop - j] && tt[sor - i][oszlop - j].innerHTML == "") {tt[sor - i][oszlop - j].style.background = color; lepesekSzama++;}
                }
            }

            for (let i = 1; i < 2; i++) {
                for (let j = 2; j <= 2; j++) {
                    if (tt[sor + i] && tt[sor + i][oszlop + j] && tt[sor + i][oszlop + j].innerHTML == "") {tt[sor + i][oszlop + j].style.background = color; lepesekSzama++;}
                    if (tt[sor + i] && tt[sor + i][oszlop - j] && tt[sor + i][oszlop - j].innerHTML == "") {tt[sor + i][oszlop - j].style.background = color; lepesekSzama++;}
                    if (tt[sor - i] && tt[sor - i][oszlop + j] && tt[sor - i][oszlop + j].innerHTML == "") {tt[sor - i][oszlop + j].style.background = color; lepesekSzama++;}
                    if (tt[sor - i] && tt[sor - i][oszlop - j] && tt[sor - i][oszlop - j].innerHTML == "") {tt[sor - i][oszlop - j].style.background = color; lepesekSzama++;}
                }
            }

            if (obj.innerHTML == "") {
                lepesek++
                obj.innerHTML = lepesek
            }

            if (lepesek == sorok * cellak) {
                document.getElementById("imgVictory").style.display = "block"
                document.getElementById("imgNerd").style.display = "block"
                let subText = document.getElementById("subText")
                subText.style.display = "block"
                subText.innerHTML = "A játéknak vége!<br>Eredmény: SIKERES!<br>Gratulálunk!"
            } else if (lepesekSzama == 0) {
                let subText = document.getElementById("subText")
                subText.style.display = "block"
                subText.innerHTML = "A játéknak vége!<br>Eredmény: SIKERTELEN"
            }
        }
    }
}