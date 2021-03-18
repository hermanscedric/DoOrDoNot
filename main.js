const { app,
    BrowserWindow,
    ipcMain } = require('electron')
const Item = require('./item.js');
const DataStore = require('./dataStore.js');

const items = new DataStore();
let win;

// Add those three items once to populate the itemsList. This is only for testing purpose, will be removed soon.
/*var item1 = new Item("Make this app", "Electron app", "April 2021", "in progress");
var item2 = new Item("Make website", "HTML/CSS", "June 2021", "not started");
var item3 = new Item("Make Github account", "Github", "January 2021", "completed");
items.addItem(item1)
items.addItem(item2)
items.addItem(item3)*/

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    win.loadFile('index.html')

    win.on('ready-to-show', () => {
        win.webContents.send('items', JSON.stringify(items))
    })
}

ipcMain.on('addItem', (event, newItem) => {
    let newItemJSON = JSON.parse(newItem)
    let duplicatedName = items.checkForDuplication(newItemJSON)
    if (duplicatedName) {
        win.webContents.send('items', JSON.stringify(items), duplicatedName)
    } else {
        items.addItem(newItemJSON)
        win.webContents.send('items', JSON.stringify(items), duplicatedName)
    }
})

ipcMain.on('editItem', (event, name) => {
    let item = items.getItem(name)
    win.webContents.send('editItem', JSON.stringify(item))
})

ipcMain.on('updateItem', (event, updatedItem) => {
    let updatedItemJSON = JSON.parse(updatedItem)
    items.updateItem(updatedItemJSON)
    win.webContents.send('items', JSON.stringify(items))
})

ipcMain.on('deleteItem', (event, name) => {
    let item = items.getItem(name)
    items.deleteItem(item)
    win.webContents.send('items', JSON.stringify(items))
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
