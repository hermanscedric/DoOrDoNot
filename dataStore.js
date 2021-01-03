const Store = require('electron-store');

const dataStore = new Store();

let item1 = new Item("Make app", "Electron app", "april 2021", "in progress");
let item2 = new Item("Make app", "Electron app", "april 2021", "in progress");
let item3 = new Item("Make app", "Electron app", "april 2021", "in progress");

dataStore.set(item1.name, item1);
dataStore.set(item2.name, item2);
dataStore.set(item3.name, item3);