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
}

module.exports = DataStore;