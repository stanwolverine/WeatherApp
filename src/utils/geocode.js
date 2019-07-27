const request = require('request');

// const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamF0aW5uYWdhciIsImEiOiJjank1bjN6Z2cwMzB1M2hwcGoyZHI4ZGN6In0.UXXqVNdwml1vQYHU6c9XDQ&limit=1`;

// request({ url: urlMapBox, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to location services.');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location. Try another search.');
//   } else {
//     console.log(
//       `Longitude and Latitude for ${response.body.features[0].place_name}:`
//     );
//     console.log(response.body.features[0].center[0]);
//     console.log(response.body.features[0].center[1]);
//   }
// });

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoiamF0aW5uYWdhciIsImEiOiJjank1bjN6Z2cwMzB1M2hwcGoyZHI4ZGN6In0.UXXqVNdwml1vQYHU6c9XDQ&limit=1';

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        'Unable to connect to location services. Check if you are connected to internet',
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback('Unable to find location, Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode