class Item {
    constructor(name, description, deadline, state) {
        this.name = name;
        this.description = description;
        this.startDate = new Date().toLocaleDateString();
        this.deadline = deadline;
        this.state = state;
    }
}

module.exports = Item;