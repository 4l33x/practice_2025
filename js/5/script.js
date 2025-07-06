function saveTable() {
    localStorage.clear();

    const rows = document.querySelectorAll("tbody tr");

    let i = 0, j = 0;

    rows.forEach(row => {
        i++;
        j = 0;
        const cells = Array.from(row.cells);
        cells.forEach(cell => {
            j++;
            localStorage.setItem(String(i) + " " + String(j), cell.querySelector("input").value);
        })
    })

    const table = document.querySelector("#table");

    localStorage.setItem('savedTable', table.innerHTML);
}

function loadTable() {
    const table = localStorage.getItem('savedTable');
    if (table) {
        document.querySelector("#table").innerHTML = table;
    }

    const rows = document.querySelectorAll("tbody tr");
    
    let i = 0, j = 0;

    rows.forEach(row => {
        i++;
        j = 0;
        const cells = Array.from(row.cells);
        cells.forEach(cell => {
            j++;
            cell.querySelector("input").value = localStorage.getItem(String(i) + " " + String(j));
        })
    });
}

function lock_input() {
    document.querySelectorAll("input").forEach(input => {
        let clicked = false;

        input.readOnly = "true";

        input.addEventListener("dblclick", function () {
            this.readOnly = "";
            this.focus();
            clicked = true;
        });

        input.addEventListener("blur", function () {
            if (clicked) {
                this.readOnly = "true";
                clicked = false;
            }
        });

        input.addEventListener("keydown", function (e) {
            if (e.key == "Enter" && clicked) {
                clicked = false;
                this.readOnly = "true";
                this.blur();
            }
        })

        input.addEventListener("click", function (e) {
            if ('ontouchstart' in window) {
                this.readOnly = "";
                this.focus();
                clicked = true;
            }
        })
    });
}

function adjustButtons() {
    const height = table.offsetHeight;
    let m = Math.floor(height / 2 - 30)
    if (m < 0) m = 0;
    right_buttons.style.marginTop = `${m}px`;
}

function createRow() {
    const tbody = table.querySelector('tbody');
    const row = tbody.insertRow();

    const first_row = table.querySelector("tbody tr");
    
    for (let i = 0; i < first_row.cells.length; i++){
        row.insertCell().innerHTML = "<input>";
    }
    adjustButtons();
    lock_input();
}

function deleteRow() {
    let rows = table.querySelectorAll("tbody tr");
    if (rows.length == 1) return;

    let row = rows[rows.length - 1]
    let asked = false;

    const cells = Array.from(row.cells);

    for (let i = 0; i < cells.length; i++){
        let cell = cells[i];
        let value = cell.querySelector("input").value;
        if (value != "" && !asked) {
            asked = true;
            let result = confirm("В ряду находятся данные.\nВы уврены, что хотите его удалить?");
            if (!result) return;
        }
        cell.querySelector("input").value = "";
    };
    
    rows[rows.length - 1].remove();
    adjustButtons();
}

function createCol() {
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        row.insertCell().innerHTML = "<input>";
    });
    lock_input();
}

function deleteCol() {
    const rows = table.querySelectorAll("tbody tr");

    let asked = false;

    for (let i = 0; i < rows.length; i++){
        let row = rows[i];
        if (row.cells.length == 1) return;
        if (row.cells[row.cells.length - 1].querySelector("input").value != "" && !asked) {
            asked = true;
            let result = confirm("В столбце находятся данные.\nВы уврены, что хотите его удалить?");
            if (!result) return;
        }
    };
    for (let i = 0; i < rows.length; i++){
        let row = rows[i];
        row.cells[row.cells.length - 1].querySelector("input").value = "";
        row.cells[row.cells.length - 1].remove();
    }
}

row_plus.onclick = function () {
    createRow();
}

row_minus.onclick = function () {
    deleteRow();
}

col_plus.onclick = function () {
    createCol();
}

col_minus.onclick = function () {
    deleteCol();
}

loadTable();
adjustButtons();
lock_input();

window.addEventListener("beforeunload", saveTable);