let WIDTH_IN_CELL = 4;

let field = [];

document.addEventListener("click", function (e) {
    let cur_element = e.target;
    if (cur_element.tagName === "TD") {
        move(cur_element.parentElement.rowIndex, cur_element.cellIndex);
        drawTable();
        if (isWinner()) {
            alert("ПОБЕДА!!!1");
            document.getElementById('table').style.pointerEvents = "None";
        }

    }
    //console.log(e.target);
});

function init() {
    field = [];
    field.push([15, 13, 11, 6]);
    field.push([12, 1, 5, 2]);
    field.push([3, 4, 0, 7]);
    field.push([9, 8, 10, 14]);

    drawTable();
    document.getElementById('table').style.pointerEvents = "auto";
}

function move(y, x) {
    let cur_num = field[y][x];
    let direction = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    if (!cur_num) {
        return;
    }

    for (let i = 0; i < direction.length; ++i) {
        let dy = y + direction[i][0];
        let dx = x + direction[i][1];
        if ((dy < WIDTH_IN_CELL && dy > -1) && (dx < WIDTH_IN_CELL && dx > -1) && field[dy][dx] === 0) {
            field[dy][dx] = cur_num;
            field[y][x] = 0;
            break;
        }
    }
}

function isWinner() {
    let counter = 0;
    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        for (let j = 0; j < WIDTH_IN_CELL; ++j) {
            ++counter;
            if (field[i][j] !== counter && counter !== 16) {
                return false;
            }
        }
    }
    return true;
}

function drawTable() {
    let html_output = '';
    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        html_output += '<tr>';
        for (let j = 0; j < WIDTH_IN_CELL; ++j) {
            html_output += '<td>';
            if (field[i][j] === 0) {
                html_output += ' ';
            } else {
                html_output += field[i][j];
            }
            html_output += '</td>';
        }
        html_output += '</td>';
    }
    document.getElementById('table').innerHTML = html_output;
}

init();