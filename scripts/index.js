// this just gives the user access to their data via a blob
document.getElementById('download-blob').addEventListener('click', function () {
    const searches = localStorage.getItem('searches');
    const list = localStorage.getItem('list');
    const data = {
        searches: list ? JSON.parse(searches) : null,
        list: list ? JSON.parse(list) : null
    };
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'blob.json';
    link.click();
    // making the download blob button download a json file
});

document.getElementById('clear-button').addEventListener('click', function () {
    localStorage.removeItem('searches');
    localStorage.removeItem('list');
    // clears all the local variables used on the site
});
