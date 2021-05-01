///// Display city & currentTime

function displayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[date.getMonth()];

  let daydate = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${daydate} ${month} ${year}, ${hours}:${minutes} h`;
}

let dayTime = document.querySelector("#date");
let currentTime = new Date();
dayTime.innerHTML = displayDate(currentTime);


function showResults(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wet").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "5d5d96fb0e392bc7e857fc19522c1485";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showResults);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let textField = document.querySelector("#search-form");
textField.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "5d5d96fb0e392bc7e857fc19522c1485";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showResults);
}

function handleCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#here-button");
currentLocationButton.addEventListener("click", handleCurrentPosition);

search("London");


/////icon;

////let iconElement = document.querySelectorelector("#icon");


//// Degree to Fahrenheit and vice versa

function convertToCelsius(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = 18;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = 64;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);
