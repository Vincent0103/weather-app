(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var a=t.g.document;if(!e&&a&&(a.currentScript&&(e=a.currentScript.src),!e)){var r=a.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&!e;)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();t.p,t.p,t.p,t.p,t.p,t.p;function e(t){document.querySelector(".darken-body-div").style.display="display"===t?"flex":"none"}function a(t){const e=document.querySelector(".search-container > #weather-location");t?e.classList.add("invalid"):e.classList.remove("invalid")}const r={getWeatherDataFromLocation:async function(t){try{e("display");const r=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e0ff8ee4614270bd491128232208&q=${t}&days=3&aqi=yes&alerts=no`),n=await r.json();a(!1);const o=new Date(n.forecast.forecastday[0].date);return n.currentDay=o.getDay(),n}catch{return e("none"),a(!0),new Error("Invalid country/city name!")}},getWeatherCityDataObj:async function(t){let e;await r.getWeatherDataFromLocation(t).then((t=>{e=t}));const{currentDay:a}=e,n=e.location.name,{country:o}=e.location,i=e.current,c=e.forecast.forecastday[0],s=e.forecast.forecastday,u={celsius:Math.round(i.temp_c),fahrenheit:Math.round(i.temp_f)},d={celsius:Math.round(c.day.maxtemp_c),fahrenheit:Math.round(c.day.maxtemp_f)},y={celsius:Math.round(c.day.mintemp_c),fahrenheit:Math.round(c.day.mintemp_f)},h=i.condition.text.toLowerCase(),p=Math.round(i.air_quality.co),l=Math.round(i.humidity),{uv:f}=i;return{currentDay:a,city:n,country:o,avgTemp:u,minTemp:y,maxTemp:d,condition:h,airQuality:p,avgHumidity:l,forecastDays:s,uv:f,wind:Math.round(i.wind_kph)}},getProperDayNum:function(t){let e=t;return e>6&&(e-=6),e>6&&(e=0),e}};r.getWeatherDataFromLocation})();