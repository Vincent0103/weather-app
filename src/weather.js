import rainyIcon from './assets/rainy.svg';
import cloudyIcon from './assets/cloud.svg';
import sunnyIcon from './assets/sunny.svg';

const weatherLogic = (() => {
  async function getWeatherDataFromLocation(location) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${location}&days=10&aqi=yes&alerts=no`);
      const weatherData = await response.json();
      console.log(weatherData);
      return weatherData;
    } catch {
      return new Error('Invalid city!');
    }
  }

  return { getWeatherDataFromLocation };
})();

const weatherDOM = (() => {
  function handleWeatherIcon(textCondition, container) {
    const weatherIconContainer = container;
    if (weatherIconContainer.querySelector('svg')) {
      weatherIconContainer.querySelector('svg').remove();
    } else if (weatherIconContainer.querySelector('img')) {
      weatherIconContainer.querySelector('img').remove();
    }

    const myImg = new Image();
    myImg.classList.add('weather-icon');
    if (textCondition.includes('rain')) myImg.src = rainyIcon;
    else if (textCondition.includes('cloud') || textCondition.includes('overcast')) myImg.src = cloudyIcon;
    else if (textCondition.includes('sunny')) myImg.src = sunnyIcon;
    else if (textCondition.includes('clear')) console.error('FILL IT');
    weatherIconContainer.appendChild(myImg);
  }

  function changeHourLocationWeatherData(weatherDataContainer, weatherDataObj) {
    const h1 = weatherDataContainer.querySelector('.location-heading');

    const cityHeading = h1.querySelector('.city-heading');
    cityHeading.textContent = `${weatherDataObj.city}, `;

    const countryHeading = h1.querySelector('.country-heading');
    countryHeading.textContent = weatherDataObj.country;

    const avgTempHeading = weatherDataContainer.querySelector('.temp-heading');
    avgTempHeading.textContent = `${weatherDataObj.avgTemp.celsius}°C`;

    const tempConditioniconHeading = weatherDataContainer.querySelector('.temp-conditionicon-heading');
    handleWeatherIcon(weatherDataObj.condition, tempConditioniconHeading);

    const conditionHeading = weatherDataContainer.querySelector('.condition-heading');
    conditionHeading.textContent = weatherDataObj.condition.slice(0, 1).toUpperCase()
    + weatherDataObj.condition.slice(1);

    const minTempP = weatherDataContainer.querySelector('.min-temp-container > p');
    minTempP.textContent = `${weatherDataObj.minTemp.celsius}°C`;

    const maxTempP = weatherDataContainer.querySelector('.max-temp-container > p');
    maxTempP.textContent = `${weatherDataObj.maxTemp.celsius}°C`;

    const airQualityP = weatherDataContainer.querySelector('.air-quality-container > p');
    airQualityP.textContent = `${weatherDataObj.airQuality} CO`;

    const humidityP = weatherDataContainer.querySelector('.humidity-container > p');
    humidityP.textContent = weatherDataObj.avgHumidity;
  }

  function changeForecastLocationWeatherData(forecastDataContainer, forecastDataObj, forecastNum) {
    const forecastDay = forecastDataObj[forecastNum].day;

    const tempHeading = forecastDataContainer.querySelector('.temp-heading');
    tempHeading.textContent = `${Math.round(forecastDay.avgtemp_c)}°C`;

    const textCondition = forecastDay.condition.text.toLowerCase();

    const tempConditioniconHeading = forecastDataContainer.querySelector('.temp-conditionicon-heading');
    handleWeatherIcon(textCondition, tempConditioniconHeading);

    const conditionHeading = forecastDataContainer.querySelector('.condition-heading');
    conditionHeading.textContent = textCondition.slice(0, 1).toUpperCase()
    + textCondition.slice(1);

    const minTempP = forecastDataContainer.querySelector('.min-temp-container > p');
    minTempP.textContent = `${Math.round(forecastDay.mintemp_c)}°C`;

    const maxTempP = forecastDataContainer.querySelector('.max-temp-container > p');
    maxTempP.textContent = `${Math.round(forecastDay.maxtemp_c)}°C`;

    const airQualityP = forecastDataContainer.querySelector('.air-quality-container > p:last-child');
    airQualityP.textContent = `${Math.round(forecastDay.air_quality.co)} CO`;

    const humidityP = forecastDataContainer.querySelector('.humidity-container > p:last-child');
    humidityP.textContent = Math.round(forecastDay.avghumidity);
  }

  function changeWeatherData(weatherDataContainer, weatherDataObj) {
    changeHourLocationWeatherData(weatherDataContainer, weatherDataObj);
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
    const forecastDays = weatherLocationData.forecast.forecastday;
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
      city, country, avgTemp, minTemp, maxTemp, condition, airQuality, avgHumidity, forecastDays,
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
    const forecastLocationWeather = document.querySelectorAll('.forecast-location-weather');
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
          const forecastDataObj = weatherDataObj.forecastDays;
          changeWeatherData(weatherDataContainer, weatherDataObj);

          forecastLocationWeather.forEach((container, index) => {
            changeForecastLocationWeatherData(container, forecastDataObj, index);
          });
        });
    });
  }

  function load() {
    content();
  }

  return { load };
})();

export default weatherDOM;
export const getWeatherDataFromLocationModule = weatherLogic.getWeatherDataFromLocation;
