const ipcRenderer = require('electron').ipcRenderer

var item = document.getElementById('item');

var form = document.getElementById('itemForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("added item");
})

ipcRenderer.on('items', (event, items) => {
    var response = JSON.parse(items);
    for (var i = 0; i < response.items.length; i++) {
        item.innerHTML += "<ul>" +
        "<li>" + response.items[i].name + "</li>" +
        "<li>" + response.items[i].description + "</li>" +
        "<li>" + response.items[i].startDate + "</li>" +
        "<li>" + response.items[i].deadline + "</li>" +
        "<li>" + response.items[i].state + "</li>" +
        "</ul>";
    }
})