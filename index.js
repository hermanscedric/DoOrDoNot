const ipcRenderer = require('electron').ipcRenderer
const Item = require('./item.js');

var item = document.getElementById('item');

var form = document.getElementById('itemForm');

function editItem(name) {
    ipcRenderer.send('searchItem', name);
}

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
        let target = "";

        if (response.items[i].state == 'In progress') {
            target += "<div class=\"item\" state=\"InProgress\">";
        } else {
            target += "<div class=\"item\" state=\"Completed\">";
        }

        item.innerHTML += target +
            "<p id=\"header\">" +
            "<span><strong>" + response.items[i].name + "</strong></span>" +
            "<button>Delete</button>" +
            "<button onClick=\"editItem('" + response.items[i].name + "')\">Edit</button>" +
            "</p>" +
            "<p id=\"description\">" + response.items[i].description + "</p>" +
            "<p id=\"dates\">" +
            "<span>Started: " + response.items[i].startDate + "</span>" +
            "<span>Deadline: " + response.items[i].deadline + "</span>" +
            "<p id=\"state\">" + response.items[i].state + "</p>" +
            "</div>";
    }
})