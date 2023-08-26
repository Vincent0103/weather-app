/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getWeatherDataFromLocationModule: () => (/* binding */ getWeatherDataFromLocationModule)\n/* harmony export */ });\n/* harmony import */ var _assets_rainy_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/rainy.svg */ \"./src/assets/rainy.svg\");\n/* harmony import */ var _assets_cloud_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/cloud.svg */ \"./src/assets/cloud.svg\");\n/* harmony import */ var _assets_sunny_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/sunny.svg */ \"./src/assets/sunny.svg\");\n\n\n\n\nconst weatherLogic = (() => {\n  async function getWeatherDataFromLocation(location) {\n    try {\n      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${location}&days=10&aqi=yes&alerts=no`);\n      const weatherData = await response.json();\n      const currentDay = new Date(weatherData.forecast.forecastday[0].date);\n      console.log(weatherData);\n      console.log(currentDay.getDay());\n      return weatherData;\n    } catch {\n      return new Error('Invalid city!');\n    }\n  }\n\n  return { getWeatherDataFromLocation };\n})();\n\nconst weatherDOM = (() => {\n  function handleWeatherIcon(textCondition, container) {\n    const weatherIconContainer = container;\n    if (weatherIconContainer.querySelector('svg')) {\n      weatherIconContainer.querySelector('svg').remove();\n    } else if (weatherIconContainer.querySelector('img')) {\n      weatherIconContainer.querySelector('img').remove();\n    }\n\n    const myImg = new Image();\n    myImg.classList.add('weather-icon');\n    if (textCondition.includes('rain')) myImg.src = _assets_rainy_svg__WEBPACK_IMPORTED_MODULE_0__;\n    else if (textCondition.includes('cloud') || textCondition.includes('overcast')) myImg.src = _assets_cloud_svg__WEBPACK_IMPORTED_MODULE_1__;\n    else if (textCondition.includes('sunny')) myImg.src = _assets_sunny_svg__WEBPACK_IMPORTED_MODULE_2__;\n    else if (textCondition.includes('clear')) console.error('FILL IT');\n    weatherIconContainer.appendChild(myImg);\n  }\n\n  function changeHourLocationWeatherData(weatherDataContainer, weatherDataObj) {\n    const h1 = weatherDataContainer.querySelector('.location-heading');\n\n    const cityHeading = h1.querySelector('.city-heading');\n    cityHeading.textContent = `${weatherDataObj.city}, `;\n\n    const countryHeading = h1.querySelector('.country-heading');\n    countryHeading.textContent = weatherDataObj.country;\n\n    const avgTempHeading = weatherDataContainer.querySelector('.temp-heading');\n    avgTempHeading.textContent = `${weatherDataObj.avgTemp.celsius}°C`;\n\n    const tempConditioniconHeading = weatherDataContainer.querySelector('.temp-conditionicon-heading');\n    handleWeatherIcon(weatherDataObj.condition, tempConditioniconHeading);\n\n    const conditionHeading = weatherDataContainer.querySelector('.condition-heading');\n    conditionHeading.textContent = weatherDataObj.condition.slice(0, 1).toUpperCase()\n    + weatherDataObj.condition.slice(1);\n\n    const minTempP = weatherDataContainer.querySelector('.min-temp-container > p');\n    minTempP.textContent = `${weatherDataObj.minTemp.celsius}°C`;\n\n    const maxTempP = weatherDataContainer.querySelector('.max-temp-container > p');\n    maxTempP.textContent = `${weatherDataObj.maxTemp.celsius}°C`;\n\n    const airQualityP = weatherDataContainer.querySelector('.air-quality-container > p');\n    airQualityP.textContent = `${weatherDataObj.airQuality} CO`;\n\n    const humidityP = weatherDataContainer.querySelector('.humidity-container > p');\n    humidityP.textContent = weatherDataObj.avgHumidity;\n  }\n\n  function changeForecastLocationWeatherData(forecastDataContainer, forecastDataObj, forecastNum) {\n    const forecastDay = forecastDataObj[forecastNum].day;\n\n    const tempHeading = forecastDataContainer.querySelector('.temp-heading');\n    tempHeading.textContent = `${Math.round(forecastDay.avgtemp_c)}°C`;\n\n    const textCondition = forecastDay.condition.text.toLowerCase();\n\n    const tempConditioniconHeading = forecastDataContainer.querySelector('.temp-conditionicon-heading');\n    handleWeatherIcon(textCondition, tempConditioniconHeading);\n\n    const conditionHeading = forecastDataContainer.querySelector('.condition-heading');\n    conditionHeading.textContent = textCondition.slice(0, 1).toUpperCase()\n    + textCondition.slice(1);\n\n    const minTempP = forecastDataContainer.querySelector('.min-temp-container > p');\n    minTempP.textContent = `${Math.round(forecastDay.mintemp_c)}°C`;\n\n    const maxTempP = forecastDataContainer.querySelector('.max-temp-container > p');\n    maxTempP.textContent = `${Math.round(forecastDay.maxtemp_c)}°C`;\n\n    const airQualityP = forecastDataContainer.querySelector('.air-quality-container > p:last-child');\n    airQualityP.textContent = `${Math.round(forecastDay.air_quality.co)} CO`;\n\n    const humidityP = forecastDataContainer.querySelector('.humidity-container > p:last-child');\n    humidityP.textContent = Math.round(forecastDay.avghumidity);\n  }\n\n  async function getWeatherCityDataObj(location) {\n    let weatherLocationData;\n    await weatherLogic.getWeatherDataFromLocation(location)\n      .then((response) => {\n        weatherLocationData = response;\n      });\n\n    const city = weatherLocationData.location.name;\n    const { country } = weatherLocationData.location;\n\n    const currentHour = weatherLocationData.current;\n    const forecastDay = weatherLocationData.forecast.forecastday[0];\n    const forecastDays = weatherLocationData.forecast.forecastday;\n    const avgTemp = {\n      celsius: Math.round(currentHour.temp_c),\n      fahrenheit: Math.round(currentHour.temp_f),\n    };\n    const maxTemp = {\n      celsius: Math.round(forecastDay.day.maxtemp_c),\n      fahrenheit: Math.round(forecastDay.day.maxtemp_f),\n    };\n    const minTemp = {\n      celsius: Math.round(forecastDay.day.mintemp_c),\n      fahrenheit: Math.round(forecastDay.day.mintemp_f),\n    };\n    const condition = currentHour.condition.text.toLowerCase();\n    const airQuality = Math.round(currentHour.air_quality.co);\n    const avgHumidity = Math.round(currentHour.humidity);\n\n    return {\n      city, country, avgTemp, minTemp, maxTemp, condition, airQuality, avgHumidity, forecastDays,\n    };\n  }\n\n  function handleEnterKeypress(inputContainer, weatherDataContainer, type) {\n    inputContainer.addEventListener('keypress', (e) => {\n      if (e.key === 'Enter') {\n        e.preventDefault();\n        let weatherDataObj;\n        getWeatherCityDataObj(inputContainer.value)\n          .then((response) => {\n            weatherDataObj = response;\n            if (type === 'hour') {\n              console.log('doing');\n              changeHourLocationWeatherData(weatherDataContainer, weatherDataObj);\n            } else if (type === 'forecast') {\n              const forecastDataObj = weatherDataObj.forecastDays;\n              weatherDataContainer.forEach((container, index) => {\n                changeForecastLocationWeatherData(container, forecastDataObj, index);\n              });\n            }\n          });\n      }\n    });\n  }\n\n  function content() {\n    const forecastLocationWeather = document.querySelectorAll('.forecast-location-weather');\n    const weatherPanelContainer = document.querySelector('.weather-panel-container');\n    const weatherSearchContainer = document.querySelector('.weather-search-container');\n    const weatherDataContainer = weatherPanelContainer.querySelector('.today-location-weather');\n    const inputLocation = weatherSearchContainer.querySelector('input[type=\"text\"]');\n    const queryBtn = weatherSearchContainer.querySelector('.search-btn');\n\n    handleEnterKeypress(inputLocation, weatherDataContainer, 'hour');\n    handleEnterKeypress(inputLocation, forecastLocationWeather, 'forecast');\n\n    queryBtn.addEventListener('click', () => {\n      getWeatherCityDataObj(inputLocation.value)\n        .then((response) => {\n          const weatherDataObj = response;\n          const forecastDataObj = weatherDataObj.forecastDays;\n          changeHourLocationWeatherData(weatherDataContainer, weatherDataObj);\n\n          forecastLocationWeather.forEach((container, index) => {\n            changeForecastLocationWeatherData(container, forecastDataObj, index);\n          });\n        });\n    });\n  }\n\n  function load() {\n    content();\n  }\n\n  return { load };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherDOM);\nconst getWeatherDataFromLocationModule = weatherLogic.getWeatherDataFromLocation;\n\n\n//# sourceURL=webpack://my_package/./src/weather.js?");

/***/ }),

/***/ "./src/assets/cloud.svg":
/*!******************************!*\
  !*** ./src/assets/cloud.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"450bb1016b7c06c02b35.svg\";\n\n//# sourceURL=webpack://my_package/./src/assets/cloud.svg?");

/***/ }),

/***/ "./src/assets/rainy.svg":
/*!******************************!*\
  !*** ./src/assets/rainy.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b4fe130886ab141fe69f.svg\";\n\n//# sourceURL=webpack://my_package/./src/assets/rainy.svg?");

/***/ }),

/***/ "./src/assets/sunny.svg":
/*!******************************!*\
  !*** ./src/assets/sunny.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"67355dbd6247a7d5a219.svg\";\n\n//# sourceURL=webpack://my_package/./src/assets/sunny.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/weather.js");
/******/ 	
/******/ })()
;