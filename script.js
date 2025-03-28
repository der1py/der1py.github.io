var turn = 'X';
var winner = '';

function resetBoard(n = 3) {
    let content = ""
    for (let i = 0; i < n * n; i++) {
        content += `<button class='box' id='box-${i}' onclick="place('box-${i}')"></button>`
    }
    document.getElementById("game").innerHTML = content;

    turn = 'X';
    winner = '';
    document.getElementById("winMsg").innerText = '';
}

function place(box) {
    if (winner == '' && document.getElementById(box).innerText == '') {
        document.getElementById(box).innerText = turn;
        document.getElementById(box).style.color = turn == 'X' ? "#FF0000" : "#0000FF";
        turn = turn == 'X' ? 'O' : 'X';
        checkWin();
    }
}

function importPos() {
    resetBoard();
    let pos = prompt("Import position");
    if (pos.length != 9) {
        resetBoard();
        alert("Invalid position");
        return;
    }
    for (let i = 0; i < 9; i++) {
        if (pos[i] != 'X' && pos[i] != 'O' && pos[i] != '1') {
            resetBoard();
            alert("Invalid position")
            return;
        }

        document.getElementById(`box-${i}`).innerText = pos[i] == '1' ? '' : pos[i];
        if (pos[i] == 'X') document.getElementById(`box-${i}`).style.color = "#FF0000";
        if (pos[i] == 'O') document.getElementById(`box-${i}`).style.color = "#0000FF";
    }
    checkWin();
}

function exportPos() {
    let pos = "";
    for (let i = 0; i < 9; i++) {
        pos += document.getElementById(`box-${i}`).innerText == '' ? '1' : document.getElementById(`box-${i}`).innerText;
    }
    return pos;
}

function checkWin() {
    let pos = exportPos();
    
    // check rows
    for (let i = 0; i < 9; i+=3) {
        if (pos[i] != '1' && pos[i] == pos[i + 1] && pos[i] == pos[i + 2]) {
            winner = pos[i];
        }
    }

    // check cols
    for (let i = 0; i < 3; i++) {
        if (pos[i] != '1' && pos[i] == pos[i + 3] && pos[i] == pos[i + 6]) {
            winner = pos[i];
        }
    }

    // check diagonals
    if (pos[4] != '1' && pos[4] == pos[0] && pos[4] == pos[8]) {
        winner = pos[4];
    }
    if (pos[4] != '1' && pos[4] == pos[2] && pos[4] == pos[6]) {
        winner = pos[4];
    }

    if (winner != '') {
        document.getElementById("winMsg").innerText = winner + " wins!";
        document.getElementById("winMsg").style.color = winner == 'X' ? "#FF0000" : "#0000FF";
    } else if (pos.split('1').length == 1) {
        winner = '1';
        document.getElementById("winMsg").innerText = "Draw";
        document.getElementById("winMsg").style.color = "#000000";
    }
    
}