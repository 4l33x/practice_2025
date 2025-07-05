const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch").default;

let cachedData = null;
let lastUpdateTime = null;

const app = express();
app.use(cors());

const fetchData = async () => {
    try {
        const response = await fetch("http://exercise.develop.maximaster.ru/service/cpu/", {
            headers: {
                'Authorization': 'Basic Y2xpOjEyMzQ0MzIx',
            }
        });
        cachedData = await response.text();
        lastUpdateTime = new Date();
        console.log("Данные получены в " + String(lastUpdateTime) + " Результат: " + cachedData);
    } catch (error) {
        console.error("Ошибка", error);
    }
};

fetchData();

setInterval(fetchData, 5000);

app.get("/cpu", (req, res) => {
    if (!cachedData) {
        return res.status(503).text({ error: "Данные ещё не загружены" });
    }
    res.send(cachedData);
});

app.listen(3000, () => console.log("Прокси работает на http://localhost:3000"));