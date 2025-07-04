const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch").default;

const app = express();
app.use(cors());

app.get('/products', async (req, res) => {
    var serverResponce = await fetch("http://exercise.develop.maximaster.ru/service/products/", {
        headers: {
            'Authorization': 'Basic Y2xpOjEyMzQ0MzIx',
            'Accept': 'application/json'
        }
    });
    console.log(req.headers);
    const rawText = await serverResponce.text()
    try {
        res.json(JSON.parse(rawText));
    } catch (error) {
        console.error("Ошибка в JSON");
        console.log(rawText);
    }
})

app.listen(3000, () => console.log("Прокси работает на http://localhost:3000"))