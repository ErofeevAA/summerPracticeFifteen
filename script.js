let WIDTH_IN_CELL = 4;

let field = [];

let is_chose_cell = false;
let chosen_coords = [4, 4];

document.addEventListener("click", function (e) {
    let cur_element = e.target;
    if (cur_element.tagName === "TD") {
        logic(cur_element.parentElement.rowIndex, cur_element.cellIndex);
        drawTable();
        if (isWinner()) {
            alert("ПОБЕДА!!!1");
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

    is_chose_cell = false;

    chosen_coords = [4, 4];

    drawTable();
}

function logic(y, x) {
    let cur_num = field[y][x];
    if (!is_chose_cell) {
        if (cur_num === 0) {
            return;
        }
        is_chose_cell = true;
        chosen_coords[0] = y;
        chosen_coords[1] = x;
        return;
    }

    if (cur_num === 0) {
        let dy = Math.abs(y - chosen_coords[0]);
        let dx = Math.abs(x - chosen_coords[1]);
        if ((dy === 1 && dx === 0) || (dy === 0 && dx === 1)) {
            field[y][x] = field[chosen_coords[0]][chosen_coords[1]];
            field[chosen_coords[0]][chosen_coords[1]] = 0;
        }
        is_chose_cell = false;
        chosen_coords = [WIDTH_IN_CELL, WIDTH_IN_CELL];
        return;
    }
    chosen_coords[0] = y;
    chosen_coords[1] = x;
}

function isWinner() {
    let counter = 0;
    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        for (let j = 0; j < WIDTH_IN_CELL; ++j) {
            ++counter;
            if (field[i][j] !== counter) {
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
            if (chosen_coords[0] === i && chosen_coords[1] === j) {
                html_output += '<td class="chosen-cell">'
            } else {
                html_output += '<td>';
            }
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