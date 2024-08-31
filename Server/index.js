const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const busFilePath = path.join(__dirname, 'buses.json');

const readBusData = () => {
  try {
    const data = fs.readFileSync(busFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading bus data:', err);
    return {};
  }
};

const writeBusData = (data) => {
  try {
    fs.writeFileSync(busFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing bus data:', err);
  }
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/buses', (req, res) => {
  const buses = readBusData();
  res.json(buses);
});

app.get('/buses/:plate', (req, res) => {
  const buses = readBusData();
  const bus = buses[req.params.plate];
  if (bus) {
    res.json(bus);
  } else {
    res.status(404).send('El bus no existe');
  }
});

app.post('/buses', (req, res) => {
  const buses = readBusData();
  const { plate, arrival } = req.body;

  if (buses[plate]) {
    res.status(400).send('El bus ya existe');
  } else {
    buses[plate] = { ...req.body, counter: 0 };
    writeBusData(buses);
    res.status(201).json(buses[plate]);
  }
});

app.put('/buses/:plate', (req, res) => {
  const buses = readBusData();
  const bus = buses[req.params.plate];

  if (bus) {
    const { last_arrival } = req.body;

    bus.last_arrival = last_arrival ? last_arrival : bus.last_arrival;
    bus.counter = bus.counter ? bus.counter + 1 : 1;
    writeBusData(buses);
    res.json(bus);
  } else {
    res.status(404).send('El bus no existe');
  }
});

app.delete('/buses/:plate', (req, res) => {
  const buses = readBusData();
  if (buses[req.params.plate]) {
    delete buses[req.params.plate];
    writeBusData(buses);
    res.send('Bus eliminado');
  } else {
    res.status(404).send('El bus no existe');
  }
});
