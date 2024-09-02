document.getElementById('searchBusForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const plateLetters = document.getElementById('plateLetters').value.toUpperCase();
    const plateNumbers = document.getElementById('plateNumbers').value;
    const errorMessageDiv = document.getElementById('error-message');
    const resBusContainer = document.getElementById('resBusContainer');
    const infoPlate = document.getElementById('plate');
    const counterEdits = document.getElementById('counter');

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
            infoPlate.textContent = `Bus: ${bus.plate}`;
            counterEdits.textContent = `N° de ediciones: ${bus.counter}`;
        })
        .catch(error => {
            errorMessageDiv.textContent = error.message;
            errorMessageDiv.style.display = 'block';
        });
});
  // Validación en para el campo de letras
  document.getElementById('plateLetters').addEventListener('input', function () {
    const input = this.value;
    this.value = input.replace(/[^A-Za-z]/g, ''); // Permitir solo letras
  });
  
  // Validación para el campo de números
  document.getElementById('plateNumbers').addEventListener('input', function () {
    const input = this.value;
    this.value = input.replace(/\D/g, ''); // Permitir solo números
  });