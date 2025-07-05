function addRow(id,name, num, price) {
    const tbody = table.querySelector('tbody');
    const row = tbody.insertRow();

    data = [String(id), name, String(num), String(price), String(num * price)];

    for (let i = 0; i < 5; i++){
        row.insertCell(i).textContent = data[i];
    }
}

function fillTable(jsonData) {
    //console.log(jsonData);
    var i = 0;
    jsonData.forEach(item => {
        addRow(++i, item.name, item.quantity, item.price);
    });
}

async function fetchData() {
    const url = 'http://localhost:3000/products';
    try {
        const response = await fetch(url);
        fillTable(await response.json());
    } catch (error) {
        console.error("Ошибка",error)
    }
}

fetchData()

function resetTable() {
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        row.style.display = "";
    })
}

function hide(min, max) {
    if (min.length == 0) min = "0";
    if (max.length == 0) max = "9999999";

    min = parseInt(min);
    max = parseInt(max);

    const rows = table.querySelectorAll("tbody tr");

    var i = 0;

    rows.forEach(row => {
        const price = parseInt(row.cells[3].textContent);
        if (price > max || price < min) {
            row.style.display = "none";
            i++;
        }
        else row.style.display = "";
    })

    if (i == rows.length) {
        error.innerText = "Нет данных, попадающих под условие фильтра."
        table.style.display = "none";
    }
}

upd.onclick = function () {
    min = String(begin.value);
    max = String(end.value);

    if (isNaN(min + max) || (min + max).includes(" ") || parseInt(min)<0 || parseInt(max)<0) {
        error.innerText = "Ошибка! Оба значения должны быть целыми положительными числами";
        return;
    }

    error.innerText = "";

    table.style.display = "";

    if ((min + max).length == 0 || parseInt(min) + parseInt(max) == 0) {
        resetTable();
        return;
    }

    hide(min, max);
}
