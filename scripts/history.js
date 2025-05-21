window.onload = function () { // load when the window loads
    const listFromStorage = JSON.parse(localStorage.getItem('searches'));

    if (listFromStorage && Array.isArray(listFromStorage)) {
        const olElement = document.getElementById('history-list');

        listFromStorage.forEach(item => { // for each item in the searches list, make a li and put it in the ol
            const liElement = document.createElement('li');
            liElement.textContent = item;
            liElement.classList.add('list-group-item');
            liElement.classList.add('search-cards');
            olElement.appendChild(liElement);
        });
    }
};

// remove the address from local storage and reload the page
document.getElementById('clear-history').addEventListener('click', function () {

    localStorage.removeItem('searches');
    location.reload();
});
