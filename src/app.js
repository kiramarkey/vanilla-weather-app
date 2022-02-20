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


function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureCurrent = Math.round(response.data.main.temp);
  let weatherCurrent = response.data.weather[0].description;
  let humidityCurrent = Math.round(response.data.main.humidity);
  let windCurrent = Math.round(response.data.wind.speed);
  let todayDay = document.querySelector("#todayDay");
  let todayWeather = document.querySelector("#todayWeather");
  let todayTemp = document.querySelector("#todayTemp");
  let todayHumid = document.querySelector("#todayHumid");
  let todayWind = document.querySelector("#todayWind");
  let locationName = response.data.name;
  let currentCityName = document.querySelector("#yourLocation");
  currentCityName.innerHTML = `${locationName}`;
  todayTemp.innerHTML = `${temperatureCurrent}°C`;
  todayWeather.innerHTML = `${weatherCurrent}`;
  todayHumid.innerHTML = `${humidityCurrent}`;
  todayWind.innerHTML = `${windCurrent}`;
  todayDay.innerHTML = formatDate(response.data.dt * 1000);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
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
  let units = "metric";
  let apiKey = "808c19e6529a8e88aa3a25cb2fc5e160";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  cityOutput.innerHTML = `${cityInput.value}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchLocation);
