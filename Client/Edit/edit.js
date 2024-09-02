document.getElementById('searchBusForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const plateLetters = document.getElementById('plateLetters').value.toUpperCase();
  const plateNumbers = document.getElementById('plateNumbers').value;
  const errorMessageDiv = document.getElementById('error-message');
  const editFormContainer = document.getElementById('editFormContainer');

  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';
  editFormContainer.style.display = 'none';

  const plate = plateLetters + plateNumbers;

  fetch(`http://localhost:3000/buses/${plate}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('El bus no fue encontrado');
      }
      return response.json();
    })
    .then(bus => {
      editFormContainer.style.display = 'block';

      document.getElementById('editArrivalForm').onsubmit = function (event) {
        event.preventDefault();
        const newArrival = document.getElementById('editArrival').value;

        fetch(`http://localhost:3000/buses/${plate}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ last_arrival: newArrival })
        })
          .then(response => response.json())
          .then(updatedBus => {
            alert(`El Bus ${plate} fue actualizado exitosamente.`);
            editFormContainer.style.display = 'none';
          })
          .catch(error => {
            console.error('Error updating bus:', error);
          });
      };
    })
    .catch(error => {
      errorMessageDiv.textContent = error.message;
      errorMessageDiv.style.display = 'block';
    });
});

document.getElementById('plateLetters').addEventListener('input', function () {
  const input = this.value;
  this.value = input.replace(/[^A-Za-z]/g, '');
});

document.getElementById('plateNumbers').addEventListener('input', function () {
  const input = this.value;
  this.value = input.replace(/\D/g, '');
});
