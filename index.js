const ipcRenderer = require('electron').ipcRenderer
const Item = require('./item.js');

var item = document.getElementById('item');

var form = document.getElementById('itemForm');

var formButton = document.getElementById('formButton');
var cancelButton = document.getElementById('formCancelButton');

function editItem(name) {
    ipcRenderer.send('editItem', name);
}

function deleteItem(name) {
    ipcRenderer.send('deleteItem', name);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (document.getElementById('formButton').innerHTML === "Add item") {
        let name = event.target[0].value;
        let description = event.target[1].value;
        let deadline = event.target[2].value;
        let state = event.target[3].value;

        let newItem = new Item(name, description, deadline, state);

        ipcRenderer.send('addItem', JSON.stringify(newItem));
    } else {
        let name = event.target[0].value;
        let description = event.target[1].value;
        let deadline = event.target[2].value;
        let state = event.target[3].value;

        let updatedItem = new Item(name, description, deadline, state);

        ipcRenderer.send('updateItem', JSON.stringify(updatedItem));

        event.target[0].value = "";
        event.target[1].value = "";
        event.target[2].value = "";
        event.target[3].value = "";
        document.getElementById('formButton').innerHTML = "Add item";
    }
})

cancelButton.addEventListener('click', function() {
    document.getElementById('name').value = "";
    document.getElementById('description').value = "";
    document.getElementById('deadline').value = "";
    document.getElementById('state').value = "";

    document.getElementById('formCancelButton').style.display = "none";    
})

ipcRenderer.on('editItem', (event, item) => {
    var response = JSON.parse(item);
    document.getElementById('name').value = response.name;
    document.getElementById('description').value = response.description;
    document.getElementById('deadline').value = response.deadline;
    document.getElementById('state').value = response.state;

    document.getElementById('formButton').innerHTML = "Update item";
    document.getElementById('formCancelButton').style.display = "block";
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
            "<button onClick=\"deleteItem('" + response.items[i].name + "')\">Delete</button>" +
            "<button onClick=\"editItem('" + response.items[i].name + "')\">Edit</button>" +
            "</p>" +
            "<p class=\"description\">" + response.items[i].description + "</p>" +
            "<p class=\"dates\">" +
            "<span>Started: " + response.items[i].startDate + "</span>" +
            "<span>Deadline: " + response.items[i].deadline + "</span>" +
            "<p class=\"state\">" + response.items[i].state + "</p>" +
            "</div>";
    }
})