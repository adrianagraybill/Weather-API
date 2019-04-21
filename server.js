'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT;

app.get('/testing', (request, response) => {
  console.log('found the testing route');
  response.send('<h1>HELLO WORLD...</h1>');
});

app.get('/location', (request, response) => {
  try {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
  }
  catch (error) {
    console.error(error);
    response.status(500).send('Status: 500. So sorry, something went wrong.');
  }
});

app.get('/weather', (request, response) => {
  console.log('From weather request', request.query.data.latitude);




  response.send('Return the results here');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));



// Helper Functions

// function to get location data
function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData);
  console.log(location);
  return location;
}

function searchWeather(query) {
  const weatherData = require('./data/darksky.json');
  weatherData.daily.data.forEach(day => {

  });
  const weather = new Weather(weatherData);
  return weather;
}

function Location(data) {
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

function Weather(data) {
  this.forecast = data.summary;
  this.time = data.time;
}
