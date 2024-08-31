document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/buses')
    .then(response => response.json())
    .then(data => {
      const busesTable = document.getElementById('busesTable').getElementsByTagName('tbody')[0];

      Object.keys(data).forEach(plate => {
        const bus = data[plate];
        const row = busesTable.insertRow();

        const cellPlate = row.insertCell(0);
        const cellLastArrival = row.insertCell(1);
        const cellCounter = row.insertCell(2);

        cellPlate.textContent = plate;
        cellLastArrival.textContent = bus.last_arrival || 'N/A';
        cellCounter.textContent = bus.counter || 0;
      });
    })
    .catch(error => {
      console.error('Error de carga de buses:', error);
    });
});
