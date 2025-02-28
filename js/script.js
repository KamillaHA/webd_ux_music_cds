'use strict';

// Loading existing CDs from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Adding eventlistener "submit" to the form
document.querySelector('#frmCD').addEventListener('submit', function(e) {
// Preventing default pageloading
    e.preventDefault();

// Declaring the variables
    const author = e.target.txtAuthor.value.trim();
    const title = e.target.txtTitle.value.trim();
    const year = parseInt(e.target.txtYear.value.trim());

    // Creating CD object
    const newCD = { author, title, year };

    // Get existing CDs from local storage or create an empty array
    const cds = JSON.parse(localStorage.getItem('cds')) || [];

    // Add new CD to the list and save to local storage
    cds.push(newCD);
    localStorage.setItem('cds', JSON.stringify(cds));

    // Add the new row to the table
    addRowToTable(newCD);

    // The form is reset
    this.reset();
});

// Add a new row to the table
function addRowToTable(cd) {
    // Cloning the template from HTML
    const trNew = document.querySelector('#cdRow').content.cloneNode(true);
    // Filling the template with submitted data
    trNew.querySelector('td:nth-of-type(1)').innerText = cd.author;
    trNew.querySelector('td:nth-of-type(2)').innerText = cd.title;
    trNew.querySelector('td:nth-of-type(3)').innerText = cd.year;
    
// Adding eventlistener to the deletebutton
const deleteBtn = trNew.querySelector('img');
deleteBtn.addEventListener('click', function() {
    deleteCD(cd);
    this.parentElement.parentElement.remove();
    });
    
    // Finding tbody and adding new row
    document.querySelector('table > tbody').appendChild(trNew);
    // Making sure the table is visible when submitted
    document.querySelector('table').classList.add('visible');
}

// Load CDs from local storage when the page loads
function loadFromLocalStorage() {
    const cds = JSON.parse(localStorage.getItem('cds')) || [];
    cds.forEach(cd => addRowToTable(cd));
}

// Delete a CD from local storage
function deleteCD(cdToDelete) {
    let cds = JSON.parse(localStorage.getItem('cds')) || [];
    cds = cds.filter(cd => cd.author !== cdToDelete.author || cd.title !== cdToDelete.title || cd.year !== cdToDelete.year);
    localStorage.setItem('cds', JSON.stringify(cds));
}
