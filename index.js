var item = document.getElementById('item');

item.innerHTML = "<ul>" +
    "<li>" + dataStore.get(item1.name).name + "</li>" +
    "<li>" + dataStore.get(item1.name).description + "</li>" +
    "<li>" + dataStore.get(item1.name).startDate + "</li>" +
    "<li>" + dataStore.get(item1.name).deadline + "</li>" +
    "<li>" + dataStore.get(item1.name).state + "</li>" +
    "</ul>";