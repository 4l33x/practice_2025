ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        controls: ["zoomControl","searchControl"],
        zoom: 10
    })
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentBody: '<p>' + [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(', ') + '</p>',
                contentFooter:'<sup>Нажмите ещё раз</sup>'
            })
        }
        else {
            myMap.balloon.close();  
        }
    })
}

send.onclick = function () {
    var err = "";
    if (names.value.trim() == "") err += "\nУкажите ФИО.";
    if (isNaN(phone.value) || phone.value.trim().length == 0) err += "\nУкажите телефон (только цифры).";
    if (!email.value.includes("@")) err += "\nУкажите действительный Email.";
    if (!myMap.balloon.isOpen()) err += "\nУкажите место доставки.";
    if (!err.length) {
        err = "Заказ оформлен!";
        error.style.color = `green`;
        error.innerText = err;

        myMap.balloon.close();
        for (const elem of [names, phone, email, comment]) elem.value = "";
    }
    else {
        error.style.color = `red`;
        error.innerText = err.slice(1);
    }
}

comment.oninput = function(){
    var com = String(comment.value);
    if (com.length > 500){
        com = com.slice(0, 500);
    }
    comment.value = com;
}
