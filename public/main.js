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

const deleteVaderButton = document.querySelector('#delete-vader-button')
const messageDiv = document.querySelector('#messageForUser')

deleteVaderButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    if(data === 'No quote to delete'){
        console.log('Worksz')
        messageDiv.innerHTML = 'No Darth Vader quote to delete'
    } else {
        window.location.reload(true)
    }
  })
});

const deleteAllQuotesButton = document.querySelector('#delete-all-quotes-button');

deleteAllQuotesButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload(true)
    })
    .catch(error => console.error('Error:', error));
});