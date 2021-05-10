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


function formatDay(timestamp) {
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
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

  celsiusTemperature = response.data.main.temp;

    getForecast(response.data.coord);
}



//// forecast////
function getForecast(coordinates) {
  let apiKey = "5d5d96fb0e392bc7e857fc19522c1485";
  let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  }


function showForecast(response) {
  let sixDayForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-3">`;
  sixDayForecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      let classes = "";
      if (index % 3 === 1 || index % 3 === 2) {
        classes += "border-end ";
      }
      if (index < 4) {
        classes += "border-bottom";
      }
      forecastHTML =
        forecastHTML +
        `
        <div class="col ${classes}">
        <ul>
        <li class="weather-forecast-day">
            ${formatDay(forecastDay.dt)}
        </li>
        <li class="weather-forecast-img">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              />
        </li>
        <li class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}°</span>
        </li>
        </ul>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

//// Degree to Fahrenheit and vice versa

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitUnit = (celsiusTemperature * 9) / 5 + 32;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = Math.round(fahrenheitUnit);
}

let celsiusTemperature = null;



let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);


search("London");