import rainyIcon from './assets/rainy.svg';
import cloudyIcon from './assets/cloud.svg';
import sunnyIcon from './assets/sunny.svg';

const weatherLogic = (() => {
  async function getWeatherDataFromLocation(location) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${location}&days=7&aqi=yes&alerts=no`);
      const weatherData = await response.json();
      const currDate = new Date();
      console.log(currDate);
      console.log(weatherData);
      return weatherData;
    } catch {
      return new Error('Invalid city!');
    }
  }

  return { getWeatherDataFromLocation };
})();

const weatherDOM = (() => {
  function changeWeatherData(weatherDataContainer, weatherDataObj) {
    function handleWeatherIcon(condition, container) {
      const weatherIconContainer = container;
      if (weatherIconContainer.querySelector('svg')) {
        weatherIconContainer.querySelector('svg').remove();
      } else if (weatherIconContainer.querySelector('img')) {
        weatherIconContainer.querySelector('img').remove();
      }

      const mySvg = new Image();
      mySvg.classList.add('weather-icon');
      if (condition.includes('rain')) mySvg.src = rainyIcon;
      else if (condition.includes('cloud')) mySvg.src = cloudyIcon;
      else if (condition.includes('sunny')) mySvg.src = sunnyIcon;
      weatherIconContainer.appendChild(mySvg);
    }

    const h1 = weatherDataContainer.querySelector('.location-heading');
    const cityHeading = h1.querySelector('.city-heading');
    const countryHeading = h1.querySelector('.country-heading');
    const avgTempHeading = weatherDataContainer.querySelector('.temp-heading');
    const tempConditioniconHeading = weatherDataContainer.querySelector('.temp-conditionicon-heading');
    const conditionHeading = weatherDataContainer.querySelector('.condition-heading');
    const minTempP = weatherDataContainer.querySelector('.min-temp-container > p');
    const maxTempP = weatherDataContainer.querySelector('.max-temp-container > p');
    const airQualityP = weatherDataContainer.querySelector('.air-quality-container > p');
    const humidityP = weatherDataContainer.querySelector('.humidity-container > p');
    cityHeading.textContent = `${weatherDataObj.city}, `;
    countryHeading.textContent = weatherDataObj.country;
    avgTempHeading.textContent = `${weatherDataObj.avgTemp.celsius}°C`;
    handleWeatherIcon(weatherDataObj.condition, tempConditioniconHeading);

    conditionHeading.textContent = weatherDataObj.condition.slice(0, 1).toUpperCase()
    + weatherDataObj.condition.slice(1);

    minTempP.textContent = `${weatherDataObj.minTemp.celsius}°C`;
    maxTempP.textContent = `${weatherDataObj.maxTemp.celsius}°C`;
    airQualityP.textContent = `${weatherDataObj.airQuality} CO`;
    humidityP.textContent = weatherDataObj.avgHumidity;
  }

  async function getWeatherCityDataObj(location) {
    let weatherLocationData;
    await weatherLogic.getWeatherDataFromLocation(location)
      .then((response) => {
        weatherLocationData = response;
      });

    const city = weatherLocationData.location.name;
    const { country } = weatherLocationData.location;

    const currentHour = weatherLocationData.current;
    const forecastDay = weatherLocationData.forecast.forecastday[0];
    const avgTemp = {
      celsius: Math.round(currentHour.temp_c),
      fahrenheit: Math.round(currentHour.temp_f),
    };
    const maxTemp = {
      celsius: Math.round(forecastDay.day.maxtemp_c),
      fahrenheit: Math.round(forecastDay.day.maxtemp_f),
    };
    const minTemp = {
      celsius: Math.round(forecastDay.day.mintemp_c),
      fahrenheit: Math.round(forecastDay.day.mintemp_f),
    };
    const condition = currentHour.condition.text.toLowerCase();
    const airQuality = Math.round(currentHour.air_quality.co);
    const avgHumidity = Math.round(currentHour.humidity);

    return {
      city, country, avgTemp, minTemp, maxTemp, condition, airQuality, avgHumidity,
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
    const allForecastContainer = document.querySelector('.allForecast-location-weather');
    const weatherPanelContainer = document.querySelector('.weather-panel-container');
    const weatherSearchContainer = document.querySelector('.weather-search-container');
    const weatherDataContainer = weatherPanelContainer.querySelector('.today-location-weather');
    const inputLocation = weatherSearchContainer.querySelector('input[type="text"]');
    const queryBtn = weatherSearchContainer.querySelector('.search-btn');

    handleEnterKeypress(inputLocation, weatherDataContainer);

    queryBtn.addEventListener('click', () => {
      getWeatherCityDataObj(inputLocation.value)
        .then((response) => {
          const weatherDataObj = response;
          changeWeatherData(weatherDataContainer, weatherDataObj);
        });
    });
  }

  function load() {
    content();
  }

  return { load };
})();

export default weatherDOM;
