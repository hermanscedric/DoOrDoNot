const ipcRenderer = require('electron').ipcRenderer
const Item = require('./item.js');

var item = document.getElementById('item');

var form = document.getElementById('itemForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = event.target[0];
    let description = event.target[1];
    let deadline = event.target[2];
    let state = event.target[3];

    let newItem = new Item(name, description, deadline, state);
    
    console.log(newItem);
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