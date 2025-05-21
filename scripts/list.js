// Puts the list items in the local storage
document.getElementById('list-form').addEventListener('submit', function () {

    const list = document.getElementById('list-input').value;
    let localList = JSON.parse(localStorage.getItem('list'));
    if (localList == null) {
        localList = [];
    }
    localList.push(list);
    localStorage.setItem('list', JSON.stringify(localList));

});

// Comments inside
window.onload = function () {
    const listFromStorage = JSON.parse(localStorage.getItem('list'));

    if (listFromStorage && Array.isArray(listFromStorage)) {
        const ulElement = document.getElementById('shopping-list'); // get the id of the shopping list

        listFromStorage.forEach(item => { // pull every item from local storage one by one
            // create elements to be used in each list element
            const liElement = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('card-header');
            deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', function () { // add a listener to the delete button that removes that index from local storage and reloads the page
                liElement.innerHTML = '';
                let localList = JSON.parse(localStorage.getItem('list'));
                localList = localList.filter(thing => thing !== item);
                localStorage.setItem('list', JSON.stringify(localList));
                location.reload();
            });
            deleteButton.classList.add('btn');
            deleteButton.classList.add('btn-primary');
            const form = document.createElement('form');
            const input = document.createElement('input');
            changeButton = document.createElement('button');
            changeButton.textContent = "Edit";
            changeButton.classList.add('btn');
            changeButton.classList.add('btn-primary');
            changeButton.addEventListener('click', function (event) { // make this button change things in local storage depending on whats in the input bar
                event.preventDefault();
                prevItem = p.textContent;
                for (let i = 0; i < listFromStorage.length; i++) {
                    if (listFromStorage[i] === prevItem) {
                        listFromStorage[i] = input.value;
                        break;
                    }
                }
                localStorage.setItem('list', JSON.stringify(listFromStorage));
                p.textContent = input.value;
            });
            // append everything like your life depends on it
            liElement.appendChild(p);
            liElement.appendChild(deleteButton);
            input.classList.add('form-control');
            form.appendChild(input);
            form.appendChild(changeButton);
            form.classList.add('d-flex');
            form.appendChild(deleteButton);
            liElement.appendChild(form);
            liElement.classList.add('card');
            liElement.classList.add('list-cards');
            ulElement.appendChild(liElement);
        });
    }
};

// makes the clear button remove the local storage address and reload the page
document.getElementById('clear-list').addEventListener('click', function () {

    localStorage.removeItem('list');
    location.reload();
});
