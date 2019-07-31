const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const errorMsg = document.querySelector('#error-msg');
const weatherReportOne = document.querySelector('#forecast-msg-1');
const weatherReportTwo = document.querySelector('#forecast-msg-2');
const weatherReportThree = document.querySelector('#forecast-msg-3');
const weatherReportFour = document.querySelector('#forecast-msg-4');
const weatherReportFive = document.querySelector('#forecast-msg-5');
const weatherReportSix = document.querySelector('#forecast-msg-6');
const weatherReportSeven = document.querySelector('#forecast-msg-7');
const weatherReportEight = document.querySelector('#forecast-msg-8');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const address = searchInput.value;
  searchInput.value = '';
  const weatherUrl = '/weather?address=' + address;

  errorMsg.textContent = 'Loading....';
  weatherReportOne.textContent = '';
  weatherReportTwo.textContent = '';
  weatherReportThree.textContent = '';
  weatherReportFour.textContent = '';
  weatherReportFive.textContent = '';
  weatherReportSix.textContent = '';
  weatherReportSeven.textContent = '';
  weatherReportEight.textContent = '';

  fetch(weatherUrl)
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        errorMsg.textContent = response.error;
      } else {
        errorMsg.textContent = '';
        weatherReportOne.textContent = 'Summary: ' + response.forecast;
        weatherReportTwo.textContent =
          'Temperature (In Celcius): ' + response.currentTemperature;
        weatherReportThree.textContent = 'Location: ' + response.location;
        weatherReportFour.textContent =
          'High Temperature: ' + response.highTemperature;
        weatherReportFive.textContent =
          'High Temperature Time: ' + Date(response.highTemperatureTime);
        weatherReportSix.textContent =
          'Low Temperature: ' + response.lowTemperature;
        weatherReportSeven.textContent =
          'Low Temperature Time: ' + Date(response.lowTemperatureTime);
        weatherReportEight.textContent = 'Search Term: ' + response.searchTerm;
      }
    });
});
