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

    updateItem(item) {
        var newItems = this.items.filter(function(name) {
            return name != item.name;
        })
        this.set('items', newItems);
    }
}

module.exports = DataStore;