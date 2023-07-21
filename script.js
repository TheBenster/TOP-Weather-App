const API_KEY = "5d5ddc24a54942fcb90143007231707";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityDiv = document.querySelector(".city");
const convert = document.querySelector("#convert");

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const processedData = processData(data);
  displayCity(processedData.cityName, processedData.country);
  displayWeather(processedData.weather, processedData.icon);
  displayTemp(processedData.temp);

  console.log(data);
}

function processData(data) {
  const weather = data.current.condition.text;
  const icon = data.current.condition.icon;
  // const tempF = data.current.temp_f;
  const temp = data.current.temp_c;
  // const temp = data.main.temp;
  // const description = data.weather[0].description;
  const cityName = data.location.name;
  const country = data.location.country;
  // const icon = data.weather[0].icon;
  // const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(weather);
  return { weather, icon, temp, cityName, country };
}

searchBtn.addEventListener("click", () => {
  // Check if the cityInput value is empty
  const city = cityInput.value.trim();
  if (city === "") {
    // If the city is empty, default to "London"
    getWeather("London");
  } else {
    const parts = city.split(",");
    const cityName = parts[0].trim();
    const country = parts[1] ? parts[1].trim() : "";
    const formattedCity = country ? `${cityName},${country}` : cityName;
    cityDiv.innerHTML = "";
    getWeather(formattedCity);
  }
});
getWeather("London");
function displayCity(cityName, country) {
  let cityText = document.createElement("p");
  cityText.textContent = `${cityName}, ${country}`;
  cityDiv.appendChild(cityText);
}

function displayWeather(weather, icon) {
  let weatherDiv = document.querySelector(".weatherDiv");
  weatherDiv.innerHTML = "";
  let weatherText = document.createElement("p");
  let weatherIcon = document.createElement("img");
  weatherIcon.src = icon;
  console.log(icon);
  weatherText.textContent = `${weather}`;
  weatherDiv.appendChild(weatherIcon);
  weatherDiv.appendChild(weatherText);
}

function displayTemp(temp) {
  let tempDiv = document.querySelector(".tempDiv");
  tempDiv.innerHTML = "";
  let tempText = document.createElement("p");
  let tempIcon = document.createElement("svg");
  tempText.textContent = `${temp}°C`;
  tempIcon.innerHTML =
    '<svg stroke="black" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thermometer</title><path d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z" /></svg>';
  tempDiv.appendChild(tempText);
  tempDiv.appendChild(tempIcon);
}

function convertToF(temp) {
  let currentFarenheit = true;
  let currentCel = false;
  return temp * (9 / 5) + 32;
}

function convertToC(temp) {
  let currentFarenheit = false;
  let currentCel = true;
  return (temp - 32) * (5 / 9);
}

convert.addEventListener("click", (temp) => {
  if (currentCel) {
    convertToF(temp);
  } else {
    convertToC(temp);
  }
});

function displayNextThreeDays(forecastItems) {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
  console.log(forecastItems);

  for (let i = 0; i < 3 && i < forecastItems.length; i++) {
    const item = forecastItems[i];

    // Access the forecast data from the item object
    const forecastDate = new Date(item.dt * 1000);
    const forecastDay = forecastDate.toLocaleString("en-us", {
      weekday: "long",
    });
    const forecastWeather = item.weather[0].main;
    const forecastTemp = item.main.temp;
    const forecastIcon = item.weather[0].icon;
    const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIcon}.png`;

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    const dayName = document.createElement("p");
    dayName.textContent = forecastDay;

    const weatherIcon = document.createElement("img");
    weatherIcon.src = forecastIconUrl;

    const temperature = document.createElement("p");
    temperature.textContent = `${forecastTemp}°C`;

    dayDiv.appendChild(dayName);
    dayDiv.appendChild(weatherIcon);
    dayDiv.appendChild(temperature);

    forecastContainer.appendChild(dayDiv);
  }
}
