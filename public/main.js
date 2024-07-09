const updateButton = document.querySelector('#update-button');

updateButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => res.json())
    .then(response => { 
        window.location.reload(true);
    })
    .catch(error => console.error('Error:', error));
});

const deleteVaderButton = document.querySelector('#delete-vader-button');
const messageDiv = document.querySelector('#messageForUsers');
const deleteAllQuotesButton = document.querySelector('#delete-all-button');

// Event listener for "Delete Darth Vader's quote" button
deleteVaderButton.addEventListener('click', () => {
    fetch(`/quotes/darth-vader`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        if (data === 'No quote to delete') {
            messageDiv.innerHTML = 'No Darth Vader quote to delete';
        } else {
            messageDiv.innerHTML = data;
            window.location.reload(true);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Event listener for "Delete All Quotes" button
deleteAllQuotesButton.addEventListener('click', () => {
    fetch(`/quotes`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        messageDiv.innerHTML = data;
        window.location.reload(true);
    })
    .catch(error => console.error('Error:', error));
});
