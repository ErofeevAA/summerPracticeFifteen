let WIDTH_IN_CELL = 4;

let field = [];

document.addEventListener("click", function (e) {
    let cur_element = e.target;
    if (cur_element.tagName === "TD") {
        move(cur_element.parentElement.rowIndex, cur_element.cellIndex);
        //cur_element.style.animation = "left-right 1s 1 linear"
        drawField();
        if (isWinner()) {
            alert("ПОБЕДА!!!1");
            document.getElementById('table').style.pointerEvents = "None";
        }
    }
    //console.log(e.target);
});

function init() {
    fillField();
    drawField();
    document.getElementById('table').style.pointerEvents = "auto";
}

function fillField() {
    let NUM_ELEM = 16
    let is_free_nums = [];
    let index_row_zero;
    for (let i = 0; i < NUM_ELEM; ++i) {
        is_free_nums.push(false);
    }

    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        field.push([0, 0, 0, 0]);
    }

    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        for (let j = 0; j < WIDTH_IN_CELL; ++j) {
            while (true) {
                let num = Math.floor(Math.random() * NUM_ELEM);
                if (!is_free_nums[num]) {
                    is_free_nums[num] = true;
                    field[i][j] = num;
                    if (!num) {
                        index_row_zero = num;
                    }
                    break;
                }
            }
        }
    }

    if (!hasSolve(index_row_zero)) {
        if (field[0][0] && field[0][1]) {
            let tmp = field[0][0];
            field[0][0] = field[0][1];
            field[0][1] = tmp;
            return;
        }
        let tmp = field[0][2];
        field[0][2] = field[0][3];
        field[0][3] = tmp;
    }
}

function hasSolve(index_row_zero) {
    let sum_inversion = 0;
    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        for (let j = 0; j < WIDTH_IN_CELL; ++j) {
            for (let k = 0; k <= i; ++k) {
                for (let l = 0; l < j; ++l) {
                    if (field[i][j] && field[i][j] < field[k][l]) {
                        ++sum_inversion;
                    }
                }
            }
        }
    }
    //console.log(sum_inversion);
    return !!(((index_row_zero + 1) + sum_inversion) % 2);
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

function drawField() {
    let html_output = '';
    for (let i = 0; i < WIDTH_IN_CELL; ++i) {
        html_output += '<tr>';
        for (let j = 0; j < WIDTH_IN_CELL; ++j) {
            html_output += '<td>' + (field[i][j] ? field[i][j] : ' ') + '</td>';
        }
        html_output += '</td>';
    }
    document.getElementById('table').innerHTML = html_output;
}

init();
