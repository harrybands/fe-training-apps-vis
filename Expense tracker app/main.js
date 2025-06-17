function loadItems() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    return items;
}

function saveItem(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}