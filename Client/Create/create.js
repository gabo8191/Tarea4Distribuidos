document.getElementById('createBusForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const plateLetters = document.getElementById('plateLetters').value.toUpperCase();
  const plateNumbers = document.getElementById('plateNumbers').value;
  const arrival = document.getElementById('arrival').value;
  const errorMessageDiv = document.getElementById('error-message');

  const lettersRegex = /^[A-Z]{3}$/;
  const numbersRegex = /^\d{3}$/;
  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';

  if (!lettersRegex.test(plateLetters) || !numbersRegex.test(plateNumbers)) {
    errorMessageDiv.textContent = 'La placa debe tener el formato: tres letras seguidas de tres números (por ejemplo, SKO999).';
    errorMessageDiv.style.display = 'block';
    return;
  }

  const plate = plateLetters + plateNumbers;

  const busData = {
    plate: plate,
    last_arrival: arrival
  };

  fetch('http://localhost:3000/buses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(busData)
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then(data => {
      alert(`El Bus ${data.plate} fue creado exitosamente.`);
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
