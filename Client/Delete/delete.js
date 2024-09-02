document.getElementById('searchBusForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const plateLetters = document.getElementById('plateLetters').value.toUpperCase();
  const plateNumbers = document.getElementById('plateNumbers').value;
  const errorMessageDiv = document.getElementById('error-message');
  const deleteFormContainer = document.getElementById('deleteFormContainer');

  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';
  deleteFormContainer.style.display = 'none';

  // Validar que las letras solo contengan letras
  const lettersPattern = /^[A-Za-z]{3}$/;
  if (!lettersPattern.test(plateLetters)) {
      errorMessageDiv.textContent = 'La placa debe contener exactamente 3 letras.';
      errorMessageDiv.style.display = 'block';
      return;
  }

  // Validar que los números solo contengan números
  const numbersPattern = /^\d{3}$/;
  if (!numbersPattern.test(plateNumbers)) {
      errorMessageDiv.textContent = 'La placa debe contener exactamente 3 números.';
      errorMessageDiv.style.display = 'block';
      return;
  }

  const plate = plateLetters + plateNumbers;

  fetch(`http://localhost:3000/buses/${plate}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Bus no encontrado');
      }
      return response.json();
    })
    .then(bus => {
      deleteFormContainer.style.display = 'block';

      // Confirmación para eliminar el bus
      document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
        fetch(`http://localhost:3000/buses/${plate}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar el bus');
            }
            alert(`El Bus ${plate} fue eliminado exitosamente.`);
            deleteFormContainer.style.display = 'none';
          })
          .catch(error => {
            errorMessageDiv.textContent = error.message;
            errorMessageDiv.style.display = 'block';
          });
      });

      // Cancelar eliminación
      document.getElementById('cancelBtn').addEventListener('click', function () {
        deleteFormContainer.style.display = 'none';
      });
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
