const ctx = document.getElementById("chart").getContext("2d");

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
            {
                data: [],
                backgroundColor: 'rgba(224, 255, 255,1)',
                borderColor: 'rgba(30, 144, 255,1)',
                borderWidth: 2,
                tension: 0,
                fill: true
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                ticks: { stepSize: 5 },
                title: { display: true, text: 'Время' }
            },
            y: {
                beginAtZero: false,
                min: 0,
                max: 100,
                ticks: { stepSize: 5 },
                title:{display: true, text: "CPU%"}
            }
        },
        plugins: {
            legend: {
                display: false // Отключаем легенду
            }
        }
    }
});

myChart.data.labels.push(0);

async function updateGraph() {
    try {
        let url = "http://localhost:3000/cpu";
        const response = await fetch(url);
        dot = await response.text();

        let num = parseInt(got.innerText);
        let e = parseInt(err.innerText);

        let newData = parseInt(dot);
        got.innerText = String(++num);

        if (newData == 0) {
            err.innerText = String(++e);
            if (myChart.data.datasets[0].data.length > 0) {
                newData = myChart.data.datasets[0].data[myChart.data.datasets[0].data.length - 1];
            }
            else newData=80
        }

        percent.innerText = String((e / num * 100).toPrecision(4));

        myChart.data.labels.push(myChart.data.labels[myChart.data.labels.length-1] + 5);
        myChart.data.datasets[0].data.push(newData);

        if (myChart.data.labels.length > 50) {
            myChart.data.labels.splice(0, 1);
            myChart.data.datasets[0].data.splice(0, 1);
        }

        myChart.update();

    } catch (error) {
        console.error("Ошибка", error);
    }
}

setInterval(updateGraph, 5000)