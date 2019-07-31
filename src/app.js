const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Path provided by environmental variable or our path
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jatin Nagar'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is helpful text.',
    name: 'Jatin Nagar'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jatin Nagar'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address to search!'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(
        latitude,
        longitude,
        (
          error,
          {
            summary,
            temperature,
            rainChances,
            highTemperature,
            highTemperatureTime,
            lowTemperature,
            lowTemperatureTime
          } = {}
        ) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: summary,
            currentTemperature: temperature,
            rainProbability: rainChances,
            location,
            highTemperature,
            highTemperatureTime,
            lowTemperature,
            lowTemperatureTime,
            searchTerm: req.query.address
          });
        }
      );
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404Page', {
    title: '404',
    error: 'Help article not found',
    name: 'Jatin Nagar'
  });
});

app.get('*', (req, res) => {
  res.render('404Page', {
    title: '404',
    error: 'Page not found.',
    name: 'Jatin Nagar'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port + ' port.');
});
