let sorok = 3
let cellak = 3
let tt = new Array(sorok)
let ujSor

function loadPuzzle() {
    for (let i = 0; i < sorok; i++) {
        ujSor = document.getElementById("puzzle").insertRow(i);
        tt[i] = new Array(ujSor)
        for (let j = 0; j < sorok; j++) {
            tt[i][j] = ujSor.insertCell(j)
            tt[i][j].id = i * cellak + j

            tt[i][j].onclick = function() {lepes(this)}
            tt[i][j].onmouseover = function() {hover(this)}
            tt[i][j].onmouseleave = function() {hoverLeave(this)}
            
            tt[i][j].style.border = "darkgray 2px solid"
            tt[i][j].style.background = "lightgray"
            tt[i][j].innerHTML = parseInt(tt[i][j].id) + 1
        }
    }

    let ures = sorok * cellak - 1;
	document.getElementById(ures.toString()).style.background="gray";
	document.getElementById(ures.toString()).innerHTML="";
}

function hover(doc) {
    if (doc.innerHTML != "") {
        let id = document.getElementById(doc.id)
        id.style.background = "darkgray"
    }
}

function hoverLeave(doc) {
    if (doc.innerHTML != "") {
        let id = document.getElementById(doc.id)
        id.style.background = "lightgray"
    }
}

function kever() {
    let xlepes
    let ylepes


}