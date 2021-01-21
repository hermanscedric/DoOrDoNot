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
        item.innerHTML += "<div class=\"item\">" +
            "<p id=\"header\">" +
            "<span><strong>" + response.items[i].name + "</strong></span>" +
            "<button>Delete</button>" +
            "<button>Edit</button>" +
            "</p>" +
            "<p id=\"description\">" + response.items[i].description + "</p>" +
            "<p id=\"dates\">" +
            "<span>Started: " + response.items[i].startDate + "</span>" +
            "<span>Deadline: " + response.items[i].deadline + "</span>" +
            "<p id=\"state\">" + response.items[i].state + "</p>" +
            "</div>";
    }
})