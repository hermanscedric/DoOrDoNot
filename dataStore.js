const Store = require('electron-store');

class DataStore extends Store {
    constructor (settings) {
        super(settings)
        this.items = this.get('items') || []
    }

    getItems() {
        return this.get('items') || []
    }

    addItem(item) {
        this.items = [ ...this.items, item]
        this.set('items', this.items)
    }

    searchItem(name) {
        return this.items.find(item => item.name === name);
    }

    updateItem(updatedItem) {
        let itemId = this.items.findIndex(item => item.name === updatedItem.name)
        this.items[itemId].name = updatedItem.name;
        this.items[itemId].description = updatedItem.description;
        this.items[itemId].deadline = updatedItem.deadline;
        this.items[itemId].state = updatedItem.state;
        this.set('items', this.items);
    }
}

module.exports = DataStore;