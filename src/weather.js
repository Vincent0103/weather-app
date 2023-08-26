import rainyIcon from './assets/rainy.svg';
import cloudyIcon from './assets/cloud.svg';
import sunnyIcon from './assets/sunny.svg';
import clearIcon from './assets/clear.svg';
import stormyIcon from './assets/stormy.svg';

function displayLoadingScreen(type) {
  const darkenBodyDiv = document.querySelector('.darken-body-div');
  if (type === 'display') darkenBodyDiv.style.display = 'flex';
  else darkenBodyDiv.style.display = 'none';
}

function handleInvalidInput(type) {
  const inputContainer = document.querySelector('.search-container > #weather-location');
  if (type) {
    inputContainer.classList.add('invalid');
  } else {
    inputContainer.classList.remove('invalid');
  }
}

const weatherLogic = (() => {
  async function getWeatherDataFromLocation(location) {
    try {
      displayLoadingScreen('display');
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${location}&days=3&aqi=yes&alerts=no`);
      const weatherData = await response.json();
      handleInvalidInput(false);
      const currentDay = new Date(weatherData.forecast.forecastday[0].date);
      weatherData.currentDay = currentDay.getDay();
      console.log(weatherData);
      return weatherData;
    } catch {
      displayLoadingScreen('none');
      handleInvalidInput(true);
      return new Error('Invalid country/city name!');
    }
  }

  async function getWeatherCityDataObj(location) {
    let weatherLocationData;
    await weatherLogic.getWeatherDataFromLocation(location)
      .then((response) => {
        weatherLocationData = response;
      });

    const { currentDay } = weatherLocationData;

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
    const { uv } = currentHour;
    const wind = Math.round(currentHour.wind_kph);

    return {
      currentDay,
      city,
      country,
      avgTemp,
      minTemp,
      maxTemp,
      condition,
      airQuality,
      avgHumidity,
      forecastDays,
      uv,
      wind,
    };
  }

  function getProperDayNum(currentDayNum) {
    let dayNum = currentDayNum;
    if (dayNum > 6) {
      dayNum -= 6;
    }

    // edge case to avoid any infinite loop
    if (dayNum > 6) {
      dayNum = 0;
    }
    return dayNum;
  }

  return { getWeatherDataFromLocation, getWeatherCityDataObj, getProperDayNum };
})();

const weatherDOM = (() => {
  let currentWeatherDataObj;
  let currentTempUnit;

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
    else if (textCondition.includes('clear')) myImg.src = clearIcon;
    else if (textCondition.includes('storm') || textCondition.includes('thunder')) myImg.src = stormyIcon;
    weatherIconContainer.appendChild(myImg);
  }

  function changeTempUnit(unit) {
    const tempHeadings = document.querySelectorAll('.temp-heading');
    const minTempPs = document.querySelectorAll('.min-temp-container > p');
    const maxTempPs = document.querySelectorAll('.max-temp-container > p');
    const forecastDataObj = currentWeatherDataObj.forecastDays;
    let value;

    tempHeadings.forEach((tempHeading, index) => {
      const heading = tempHeading;
      if (unit === 'fahrenheit') {
        if (index === 0) {
          value = Math.round(currentWeatherDataObj.avgTemp.fahrenheit);
          heading.textContent = `${value} F`;
        } else {
          value = Math.round(forecastDataObj[index - 1].day.avgtemp_f);
          heading.textContent = `${value} F`;
        }
      } else if (unit === 'celsius') {
        if (index === 0) {
          value = Math.round(currentWeatherDataObj.avgTemp.celsius);
          heading.textContent = `${value}°C`;
        } else {
          value = Math.round(forecastDataObj[index - 1].day.avgtemp_c);
          heading.textContent = `${value}°C`;
        }
      }
    });

    minTempPs.forEach((minTempP, index) => {
      const p = minTempP;
      if (unit === 'fahrenheit') {
        if (index === 0) {
          value = Math.round(currentWeatherDataObj.minTemp.fahrenheit);
          p.textContent = `${value} F`;
        } else {
          value = Math.round(forecastDataObj[index - 1].day.mintemp_f);
          p.textContent = `${value} F`;
        }
      } else if (unit === 'celsius') {
        if (index === 0) {
          value = Math.round(currentWeatherDataObj.minTemp.celsius);
          p.textContent = `${value}°C`;
        } else {
          value = Math.round(forecastDataObj[index - 1].day.mintemp_c);
          p.textContent = `${value}°C`;
        }
      }
    });

    maxTempPs.forEach((maxTempP, index) => {
      const p = maxTempP;
      if (unit === 'fahrenheit') {
        if (index === 0) {
          value = Math.round(currentWeatherDataObj.maxTemp.fahrenheit);
          p.textContent = `${value} F`;
        } else {
          value = Math.round(forecastDataObj[index - 1].day.maxtemp_f);
          p.textContent = `${value} F`;
        }
      } else if (unit === 'celsius') {
        if (index === 0) {
          value = Math.round(currentWeatherDataObj.maxTemp.celsius);
          p.textContent = `${value}°C`;
        } else {
          value = Math.round(forecastDataObj[index - 1].day.maxtemp_c);
          p.textContent = `${value}°C`;
        }
      }
    });
  }

  function handleFahCelBtn(FahCelBtn) {
    const btn = FahCelBtn;
    FahCelBtn.addEventListener('click', () => {
      const btnText = FahCelBtn.textContent.toLowerCase();
      if (btnText.includes('fahrenheit')) {
        btn.textContent = 'To Celsius (°C)';
        currentTempUnit = 'fahrenheit';
        changeTempUnit(currentTempUnit);
      } else {
        btn.textContent = 'To Fahrenheit (F)';
        currentTempUnit = 'celsius';
        changeTempUnit(currentTempUnit);
      }
    });
  }

  function changeHourLocationWeatherData(weatherDataContainer, weatherDataObj) {
    const locationHeading = weatherDataContainer.querySelector('.location-heading');
    locationHeading.textContent = `${weatherDataObj.city}, ${weatherDataObj.country}`;

    const avgTempHeading = weatherDataContainer.querySelector('.temp-heading');
    if (currentTempUnit === 'celsius') {
      avgTempHeading.textContent = `${weatherDataObj.avgTemp.celsius}°C`;
    } else {
      avgTempHeading.textContent = `${weatherDataObj.avgTemp.fahrenheit} F`;
    }

    const tempConditioniconHeading = weatherDataContainer.querySelector('.temp-conditionicon-heading');
    handleWeatherIcon(weatherDataObj.condition, tempConditioniconHeading);

    const conditionHeading = weatherDataContainer.querySelector('.condition-heading');
    conditionHeading.textContent = weatherDataObj.condition.slice(0, 1).toUpperCase()
    + weatherDataObj.condition.slice(1);

    const minTempP = weatherDataContainer.querySelector('.min-temp-container > p');
    if (currentTempUnit === 'celsius') {
      minTempP.textContent = `${weatherDataObj.minTemp.celsius}°C`;
    } else {
      minTempP.textContent = `${weatherDataObj.minTemp.fahrenheit} F`;
    }

    const maxTempP = weatherDataContainer.querySelector('.max-temp-container > p');
    if (currentTempUnit === 'celsius') {
      maxTempP.textContent = `${weatherDataObj.maxTemp.celsius}°C`;
    } else {
      maxTempP.textContent = `${weatherDataObj.maxTemp.fahrenheit} F`;
    }

    const airQualityP = weatherDataContainer.querySelector('.air-quality-container > p');
    airQualityP.textContent = `${weatherDataObj.airQuality} CO`;

    const humidityP = weatherDataContainer.querySelector('.humidity-container > p');
    humidityP.textContent = weatherDataObj.avgHumidity;

    const uvP = weatherDataContainer.querySelector('.uv-container > p');
    uvP.textContent = weatherDataObj.uv;

    const windSpeedP = weatherDataContainer.querySelector('.wind-container > p');
    windSpeedP.textContent = weatherDataObj.wind;
  }

  function changeForecastLocationWeatherData(forecastDataContainer, forecastDataObj, forecastNum) {
    const forecastDay = forecastDataObj[forecastNum].day;

    const daysNumsIdentifiers = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
    };

    if (forecastNum >= 1 && forecastNum <= 2) {
      let currentDayNum;
      const forecastDayHeading = forecastDataContainer.querySelector('.forecast-day-heading');

      // get the day weather name for the last two forecast day containers
      if (forecastNum === 1) {
        currentDayNum = currentWeatherDataObj.currentDay + 1;
      } else if (forecastNum === 2) {
        currentDayNum = Number.parseInt(currentWeatherDataObj.currentDay, 10) + 2;
      }

      currentDayNum = weatherLogic.getProperDayNum(currentDayNum);

      const currentDayString = daysNumsIdentifiers[currentDayNum];
      forecastDayHeading.textContent = currentDayString.slice(0, 1).toUpperCase()
      + currentDayString.slice(1);
    }

    const tempHeading = forecastDataContainer.querySelector('.temp-heading');
    if (currentTempUnit === 'celsius') {
      tempHeading.textContent = `${Math.round(forecastDay.avgtemp_c)}°C`;
    } else {
      tempHeading.textContent = `${Math.round(forecastDay.avgtemp_f)} F`;
    }

    const textCondition = forecastDay.condition.text.toLowerCase();

    const tempConditioniconHeading = forecastDataContainer.querySelector('.temp-conditionicon-heading');
    handleWeatherIcon(textCondition, tempConditioniconHeading);

    const conditionHeading = forecastDataContainer.querySelector('.condition-heading');
    conditionHeading.textContent = textCondition.slice(0, 1).toUpperCase()
    + textCondition.slice(1);

    const minTempP = forecastDataContainer.querySelector('.min-temp-container > p');
    if (currentTempUnit === 'celsius') {
      minTempP.textContent = `${Math.round(forecastDay.mintemp_c)}°C`;
    } else {
      minTempP.textContent = `${Math.round(forecastDay.mintemp_f)} F`;
    }

    const maxTempP = forecastDataContainer.querySelector('.max-temp-container > p');
    if (currentTempUnit === 'celsius') {
      maxTempP.textContent = `${Math.round(forecastDay.maxtemp_c)}°C`;
    } else {
      maxTempP.textContent = `${Math.round(forecastDay.maxtemp_f)} F`;
    }

    const airQualityP = forecastDataContainer.querySelector('.air-quality-container > p:last-child');
    airQualityP.textContent = `${Math.round(forecastDay.air_quality.co)} CO`;

    const humidityP = forecastDataContainer.querySelector('.humidity-container > p:last-child');
    humidityP.textContent = Math.round(forecastDay.avghumidity);

    const uvP = forecastDataContainer.querySelector('.uv-container > p:last-child');
    uvP.textContent = forecastDay.uv;

    const windSpeedP = forecastDataContainer.querySelector('.wind-container > p:last-child');
    windSpeedP.textContent = forecastDay.maxwind_kph;

    displayLoadingScreen('none');
  }

  function loadWeatherData(location, weatherDataContainer, forecastLocationWeather) {
    weatherLogic.getWeatherCityDataObj(location)
      .then((response) => {
        currentWeatherDataObj = response;
        const forecastDataObj = currentWeatherDataObj.forecastDays;
        changeHourLocationWeatherData(weatherDataContainer, currentWeatherDataObj);

        forecastLocationWeather.forEach((container, index) => {
          changeForecastLocationWeatherData(container, forecastDataObj, index);
        });
      });
  }

  function handleEnterKeypress(inputContainer, weatherDataContainer, type) {
    inputContainer.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        weatherLogic.getWeatherCityDataObj(inputContainer.value)
          .then((response) => {
            currentWeatherDataObj = response;
            if (type === 'hour') {
              changeHourLocationWeatherData(weatherDataContainer, currentWeatherDataObj);
            } else if (type === 'forecast') {
              const forecastDataObj = currentWeatherDataObj.forecastDays;
              weatherDataContainer.forEach((container, index) => {
                changeForecastLocationWeatherData(container, forecastDataObj, index);
              });
            }
          });
      }
    });
  }

  function content() {
    const forecastLocationWeather = document.querySelectorAll('.forecast-location-weather');
    const weatherPanelContainer = document.querySelector('.weather-panel-container');
    const weatherSearchContainer = document.querySelector('.weather-search-container');
    const weatherDataContainer = weatherPanelContainer.querySelector('.today-location-weather');
    currentTempUnit = 'celsius';

    loadWeatherData('Paris', weatherDataContainer, forecastLocationWeather);

    const inputLocation = weatherSearchContainer.querySelector('input[type="text"]');
    handleEnterKeypress(inputLocation, weatherDataContainer, 'hour');
    handleEnterKeypress(inputLocation, forecastLocationWeather, 'forecast');

    const FahCelBtn = document.querySelector('.FahCel-btn-container > button');
    handleFahCelBtn(FahCelBtn);

    const queryBtn = weatherSearchContainer.querySelector('.search-btn');
    queryBtn.addEventListener('click', () => {
      loadWeatherData(inputLocation.value, weatherDataContainer, forecastLocationWeather);
    });
  }

  function load() {
    content();
  }

  return { load, displayLoadingScreen };
})();

export default weatherDOM;
export const getWeatherDataFromLocationModule = weatherLogic.getWeatherDataFromLocation;
