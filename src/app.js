function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML =`<div class="row">`;
  dailyForecast.forEach(function(forecastDay, index) {
  if (index > 0 && index < 7) {
  forecastHTML = forecastHTML + 
    `    
    <div class="col-2">
      <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)}
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="50">
          <br>
        <div class="weather-forecast-temp">
          <span class="weather-forecast-high">
            ${Math.round(forecastDay.temp.max)}°
          </span>
          <span class="weather-forecast-low">
            | ${Math.round(forecastDay.temp.min)}°
          </span>  
        </div>
      </div>
    </div>
    `;
    }
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "808c19e6529a8e88aa3a25cb2fc5e160";
  let units = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureCurrent = Math.round(response.data.main.temp);
  let weatherCurrent = response.data.weather[0].description;
  let humidityCurrent = Math.round(response.data.main.humidity);
  let windCurrent = Math.round(response.data.wind.speed);
  let todayDay = document.querySelector("#todayDay");
  let todayWeather = document.querySelector("#todayWeather");
  let todayTemp = document.querySelector("#todayTemp");
  let todayHumid = document.querySelector("#todayHumid");
  let todayWind = document.querySelector("#todayWind");
  let todayIcon = document.querySelector("#todayIcon");
  let locationName = response.data.name;
  let currentCityName = document.querySelector("#yourLocation");

  celciusTemp = response.data.main.temp;

  currentCityName.innerHTML = `${locationName}`;
  todayTemp.innerHTML = `${temperatureCurrent}°`;
  todayWeather.innerHTML = `${weatherCurrent}`;
  todayHumid.innerHTML = `${humidityCurrent}`;
  todayWind.innerHTML = `${windCurrent}`;
  todayDay.innerHTML = formatDate(response.data.dt * 1000);
  todayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
 
  let bringSweater = document.querySelector("#bringSweater");
  if (celciusTemp < 60) {
    bringSweater.innerHTML = "Don't forget a sweater!";
  }
  else (bringSweater.innerHTML = "It's a lovely day!");
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "808c19e6529a8e88aa3a25cb2fc5e160";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

function searchLocation(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchBar");
  let cityOutput = document.querySelector("#yourLocation");
  let units = "imperial";
  let apiKey = "808c19e6529a8e88aa3a25cb2fc5e160";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  cityOutput.innerHTML = `${cityInput.value}`;

  axios.get(apiUrl).then(showTemperature);
}

function showDegFar(event) {
    event.preventDefault();
    let todayTemp = document.querySelector("#todayTemp");
    let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
    let degSym = "°";
    let conversion = Math.round(fahrenheitTemp);
    todayTemp.innerHTML = `${conversion}${degSym}`;
}

function showDegCel(event) {
    event.preventDefault();
    let todayTemp = document.querySelector("#todayTemp");
    let convertBack = Math.round(celciusTemp);
    let degSym = "°";
    todayTemp.innerHTML = `${convertBack}${degSym}`;
}

let celciusTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchLocation);

let degFar = document.querySelector("#degFar");
degFar.addEventListener("click", showDegFar);

let degCel = document.querySelector("#degCel");
degCel.addEventListener("click", showDegCel);

