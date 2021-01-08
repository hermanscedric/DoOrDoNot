const ipcRenderer = require('electron').ipcRenderer
const Item = require('./item.js');

var item = document.getElementById('item');

var form = document.getElementById('itemForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = event.target[0].value;
    let description = event.target[1].value;
    let deadline = event.target[2].value;
    let state = event.target[3].value;

    let newItem = new Item(name, description, deadline, state);

    ipcRenderer.send('addItem', JSON.stringify(newItem));
})

ipcRenderer.on('items', (event, items) => {
    item.innerHTML = "";
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