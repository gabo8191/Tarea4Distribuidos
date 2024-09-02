document.getElementById('searchBusForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const plateLetters = document.getElementById('plateLetters').value.toUpperCase();
  const plateNumbers = document.getElementById('plateNumbers').value;
  const errorMessageDiv = document.getElementById('error-message');
  const resBusContainer = document.getElementById('resBusContainer');
  const infoPlate = document.getElementById('plate');
  const counterEdits = document.getElementById('counter');
  const lastArrival = document.getElementById('lastArrival');

  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';
  resBusContainer.style.display = 'none';

  const plate = plateLetters + plateNumbers;

  fetch(`http://localhost:3000/buses/${plate}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('El bus no fue encontrado');
      }
      return response.json();
    })
    .then(bus => {
      resBusContainer.style.display = 'block';
      infoPlate.textContent = bus.plate;
      counterEdits.textContent = bus.counter;
      lastArrival.textContent = bus.last_arrival;

    })
    .catch(error => {
      errorMessageDiv.textContent = error.message;
      errorMessageDiv.style.display = 'block';
    });
});
