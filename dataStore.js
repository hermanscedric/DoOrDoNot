const Store = require('electron-store');
const Item = require('./item.js');

const dataStore = new Store();

let item1 = new Item("Make app", "Electron app", "April 2021", "in progress");
let item2 = new Item("Make 2nd app", "Electron app", "June 2021", "not started");
let item3 = new Item("Make 3rd app", "Electron app", "July 2021", "not started");

dataStore.set(item1.name, item1);
dataStore.set(item2.name, item2);
dataStore.set(item3.name, item3);

module.exports = dataStore;