class Item {
    constructor(name, description, deadline, state) {
        this.name = name;
        this.description = description;
        
        let date = new Date();

        let day = "" + date.getDate();
        if (day.length < 2) {
            day = "0" + day;
        }

        let month = "" + (date.getMonth() + 1);
        if (month.length < 2) {
            month = "0" + month;
        }

        let year = date.getFullYear();

        this.startDate = year + "-" + month + "-" + day;
        this.deadline = deadline;
        this.state = state;
    }
}

module.exports = Item;