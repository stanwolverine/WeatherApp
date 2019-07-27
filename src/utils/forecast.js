const request = require('request');

// const urlDarkSky =
//   'https://api.darksky.net/forecast/094e3517f8843053b48d7e68a87dc320/28.676228,77.289441';
//
// request({ url: urlDarkSky, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather services.');
//   } else if (response.body.error) {
//     console.log(response.body.error+': No location found!');
//   } else {
//     console.log(`
//       It is currently ${response.body.currently.temperature} degrees out.
//       There is ${response.body.currently.precipProbability}% chance of raining.
//     `);
//   }
// });

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/094e3517f8843053b48d7e68a87dc320/' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        'Unable to connect to weather services. Please check if you are connected to internet.',
        undefined
      );
    } else if (response.body.error) {
      callback(
        'Due to ' +
          response.body.error +
          ': No weather found for the given location!',
        undefined
      );
    } else {
      callback(undefined, {
        temperature: response.body.currently.temperature,
        rainChances: response.body.currently.precipProbability,
        summary: response.body.currently.summary
      });
    }
  });
};

module.exports = forecast;
