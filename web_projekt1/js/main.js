let sorok = 3
let cellak = 3
let tt = new Array(sorok)
let ujSor
let ures = sorok * cellak - 1;

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
            tt[i][j].style.width = "33%"
            tt[i][j].innerHTML = parseInt(tt[i][j].id) + 1
        }
    }

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
    for (let i = 0; i < sorok * cellak * 6; i++) {
      sorlepes = Math.floor(ures / cellak)
      cellalepes = ures % cellak
      
      switch (Math.floor(Math.random() * 4)) {
          case 0: // jobbra vagy balra
            cellalepes += (cellalepes < cellak - 1) ? 1 : -1
              break
          case 1: // balra vagy jobbra
            cellalepes += (cellalepes > 0) ? -1 : 1
              break
          case 2: // le vagy fel
            sorlepes += (sorlepes < sorok -1) ? 1 : -1
              break
          case 3: // fel vagy le
            sorlepes += (sorlepes > 0) ? -1 : 1
              break
      }
      lepes(document.getElementById((sorlepes * cellak + cellalepes).toString()))
    }
}

function lepes(doc) {
    var nid = parseInt(doc.id)
    var nures = parseInt(ures)
         
    if (nid + sorok == nures || nid - sorok == nures ||
        nid+1==nures && nures % sorok != 0 ||
        nid-1==nures && nid % sorok != 0) {
        
        document.getElementById(ures.toString()).innerHTML = document.getElementById(doc.id).innerHTML
        document.getElementById(ures.toString()).style.background = document.getElementById(doc.id).style.background
        document.getElementById(doc.id).style.background="gray"
        document.getElementById(doc.id).innerHTML=""
        ures=doc.id;
    }
}