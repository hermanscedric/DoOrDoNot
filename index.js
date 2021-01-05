const ipcRenderer = require('electron').ipcRenderer
const dataStore = require('./dataStore.js');

var item = document.getElementById('item');

item.innerHTML = "<ul>" +
    "<li>" + dataStore.get("Make app").name + "</li>" +
    "<li>" + dataStore.get("Make app").description + "</li>" +
    "<li>" + dataStore.get("Make app").startDate + "</li>" +
    "<li>" + dataStore.get("Make app").deadline + "</li>" +
    "<li>" + dataStore.get("Make app").state + "</li>" +
    "</ul>";

    ipcRenderer.on('test', (event, test) => {
        console.log(test);
    })