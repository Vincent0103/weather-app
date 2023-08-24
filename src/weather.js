import cloudyBgi from './assets/cloudy.jpg';
import rainyBgi from './assets/rainy.jpg';
import sunnyBgi from './assets/sunny.jpg';

const weatherLogic = (() => {
  async function getWeatherDataFromLocation(location) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${location}&days=7&aqi=yes&alerts=no`);
      const weatherData = await response.json();
      return weatherData;
    } catch {
      return new Error('Invalid city!');
    }
  }

  return { getWeatherDataFromLocation };
})();

const weatherDOM = (() => {
  // function updateWeatherData(weatherElementsObj) {
  //   weatherLogic.getWeatherDataFromLocation(inputLocation.value)
  //     .then((response) => {
  //       weatherLocationData = response;
  //       changeWeatherData(
  //         weatherDataContainer,
  //         weatherLocationData.location.name,
  //         weatherLocationData.location.country,
  //       );
  //     });
  // }

  function changeWeatherData(weatherDataContainer, weatherDataObj) {
    if (weatherDataObj.condition.includes('rain')) {
      setTimeout(() => {
        const bgiTransitionContainer1 = document.querySelector('.bgi-transition-container#bgi-1');
        const bgiTransitionContainer2 = document.querySelector('.bgi-transition-container#bgi-2');

        bgiTransitionContainer1.style.animation = 'fadeOut 1s forwards';
        bgiTransitionContainer2.style.backgroundImage = `url(${sunnyBgi})`;
        bgiTransitionContainer2.style.animation = 'fadeIn 1s forwards';
      });

      console.log(document.body.style.backgroundImage);
    }
    const h1 = weatherDataContainer.querySelector('.location-heading');
    const cityHeading = h1.querySelector('.city-heading');
    const countryHeading = h1.querySelector('.country-heading');
    const avgTempHeading = weatherDataContainer.querySelector('.avg-temp-heading');
    cityHeading.textContent = weatherDataObj.city;
    countryHeading.textContent = weatherDataObj.country;
    avgTempHeading.textContent = `${weatherDataObj.avgTempCelsius}°C`;
  }

  async function getWeatherCityDataObj(location) {
    let weatherLocationData;
    await weatherLogic.getWeatherDataFromLocation(location)
      .then((response) => {
        weatherLocationData = response;
        console.log(response);
      });

    const city = weatherLocationData.location.name;
    const { country } = weatherLocationData.location;
    const avgTempCelsius = weatherLocationData.forecast.forecastday[0].day.avgtemp_c;
    const maxTempCelsius = weatherLocationData.forecast.forecastday[0].day.maxtemp_c;
    const minTempCelsius = weatherLocationData.forecast.forecastday[0].day.mintemp_c;
    const condition = weatherLocationData.forecast.forecastday[0].day.condition.text;

    return {
      city, country, avgTempCelsius, minTempCelsius, maxTempCelsius, condition,
    };
  }

  function handleEnterKeypress(inputContainer, weatherDataContainer) {
    inputContainer.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        let weatherDataObj;
        getWeatherCityDataObj(inputContainer.value)
          .then((response) => {
            weatherDataObj = response;
            changeWeatherData(weatherDataContainer, weatherDataObj);
          });
      }
    });
  }

  function content() {
    const weatherPanelContainer = document.querySelector('.weather-panel-container');
    const weatherLocationContainer = weatherPanelContainer.querySelector('.weather-location-container');
    const weatherDataContainer = weatherPanelContainer.querySelector('.weather-data-container');
    const inputLocation = weatherLocationContainer.querySelector('input[type="text"]');
    const queryBtn = weatherLocationContainer.querySelector('.search-btn');

    handleEnterKeypress(inputLocation, weatherDataContainer);

    queryBtn.addEventListener('click', () => {
      getWeatherCityDataObj(inputLocation.value)
        .then((response) => console.log(response));
    });
  }

  function load() {
    content();
  }

  return { load };
})();

export default weatherDOM;
