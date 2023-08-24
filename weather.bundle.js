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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _assets_cloudy_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/cloudy.jpg */ \"./src/assets/cloudy.jpg\");\n/* harmony import */ var _assets_rainy_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/rainy.jpg */ \"./src/assets/rainy.jpg\");\n/* harmony import */ var _assets_sunny_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/sunny.jpg */ \"./src/assets/sunny.jpg\");\n\n\n\n\nconst weatherLogic = (() => {\n  async function getWeatherDataFromLocation(location) {\n    try {\n      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${location}&days=7&aqi=yes&alerts=no`);\n      const weatherData = await response.json();\n      return weatherData;\n    } catch {\n      return new Error('Invalid city!');\n    }\n  }\n\n  return { getWeatherDataFromLocation };\n})();\n\nconst weatherDOM = (() => {\n  // function updateWeatherData(weatherElementsObj) {\n  //   weatherLogic.getWeatherDataFromLocation(inputLocation.value)\n  //     .then((response) => {\n  //       weatherLocationData = response;\n  //       changeWeatherData(\n  //         weatherDataContainer,\n  //         weatherLocationData.location.name,\n  //         weatherLocationData.location.country,\n  //       );\n  //     });\n  // }\n\n  function changeWeatherData(weatherDataContainer, weatherDataObj) {\n    if (weatherDataObj.condition.includes('rain')) {\n      setTimeout(() => {\n        const bgiTransitionContainer1 = document.querySelector('.bgi-transition-container#bgi-1');\n        const bgiTransitionContainer2 = document.querySelector('.bgi-transition-container#bgi-2');\n\n        bgiTransitionContainer1.style.animation = 'fadeOut 1s forwards';\n        bgiTransitionContainer2.style.backgroundImage = `url(${_assets_sunny_jpg__WEBPACK_IMPORTED_MODULE_2__})`;\n        bgiTransitionContainer2.style.animation = 'fadeIn 1s forwards';\n      });\n\n      console.log(document.body.style.backgroundImage);\n    }\n    const h1 = weatherDataContainer.querySelector('.location-heading');\n    const cityHeading = h1.querySelector('.city-heading');\n    const countryHeading = h1.querySelector('.country-heading');\n    const avgTempHeading = weatherDataContainer.querySelector('.avg-temp-heading');\n    cityHeading.textContent = weatherDataObj.city;\n    countryHeading.textContent = weatherDataObj.country;\n    avgTempHeading.textContent = `${weatherDataObj.avgTempCelsius}°C`;\n  }\n\n  async function getWeatherCityDataObj(location) {\n    let weatherLocationData;\n    await weatherLogic.getWeatherDataFromLocation(location)\n      .then((response) => {\n        weatherLocationData = response;\n        console.log(response);\n      });\n\n    const city = weatherLocationData.location.name;\n    const { country } = weatherLocationData.location;\n    const avgTempCelsius = weatherLocationData.forecast.forecastday[0].day.avgtemp_c;\n    const maxTempCelsius = weatherLocationData.forecast.forecastday[0].day.maxtemp_c;\n    const minTempCelsius = weatherLocationData.forecast.forecastday[0].day.mintemp_c;\n    const condition = weatherLocationData.forecast.forecastday[0].day.condition.text;\n\n    return {\n      city, country, avgTempCelsius, minTempCelsius, maxTempCelsius, condition,\n    };\n  }\n\n  function handleEnterKeypress(inputContainer, weatherDataContainer) {\n    inputContainer.addEventListener('keypress', (e) => {\n      if (e.key === 'Enter') {\n        e.preventDefault();\n        let weatherDataObj;\n        getWeatherCityDataObj(inputContainer.value)\n          .then((response) => {\n            weatherDataObj = response;\n            changeWeatherData(weatherDataContainer, weatherDataObj);\n          });\n      }\n    });\n  }\n\n  function content() {\n    const weatherPanelContainer = document.querySelector('.weather-panel-container');\n    const weatherLocationContainer = weatherPanelContainer.querySelector('.weather-location-container');\n    const weatherDataContainer = weatherPanelContainer.querySelector('.weather-data-container');\n    const inputLocation = weatherLocationContainer.querySelector('input[type=\"text\"]');\n    const queryBtn = weatherLocationContainer.querySelector('.search-btn');\n\n    handleEnterKeypress(inputLocation, weatherDataContainer);\n\n    queryBtn.addEventListener('click', () => {\n      getWeatherCityDataObj(inputLocation.value)\n        .then((response) => console.log(response));\n    });\n  }\n\n  function load() {\n    content();\n  }\n\n  return { load };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherDOM);\n\n\n//# sourceURL=webpack://my_package/./src/weather.js?");

/***/ }),

/***/ "./src/assets/cloudy.jpg":
/*!*******************************!*\
  !*** ./src/assets/cloudy.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d3a199dbc9df7dff4bcb.jpg\";\n\n//# sourceURL=webpack://my_package/./src/assets/cloudy.jpg?");

/***/ }),

/***/ "./src/assets/rainy.jpg":
/*!******************************!*\
  !*** ./src/assets/rainy.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"df8105c103809bb1d8ab.jpg\";\n\n//# sourceURL=webpack://my_package/./src/assets/rainy.jpg?");

/***/ }),

/***/ "./src/assets/sunny.jpg":
/*!******************************!*\
  !*** ./src/assets/sunny.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"1ef7aefc52f6bee94f4e.jpg\";\n\n//# sourceURL=webpack://my_package/./src/assets/sunny.jpg?");

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