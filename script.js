const API_KEY = "a2e07c5b9195a0fe4ebee644a2c90fc9";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityDiv = document.querySelector(".city");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  const processedData = processData(data);
  displayCity(processedData.cityName, processedData.country);
  displayWeather(processedData.weather);
}

function processData(data) {
  const weather = data.weather[0].main;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const cityName = data.name;
  const country = data.sys.country;
  const icon = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(country);
  return { weather, temp, description, cityName, country, icon, iconUrl };
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  cityDiv.innerHTML = "";
  weatherDiv.innerHTML = "";
  getWeather(city);
});

function displayCity(cityName, country) {
  let cityText = document.createElement("p");
  cityText.textContent = `${cityName}, ${country}`;
  cityDiv.appendChild(cityText);
}

function displayWeather(weather) {
  let weatherDiv = document.querySelector(".weatherDiv");
  let weatherText = document.createElement("p");
  let weatherIcon = document.createElement("svg");
  if (weather === "Clouds") {
    weatherIcon.innerHTML =
      '<svg stroke="black" height="120" width="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clouds</title><path stroke="black" d="M19.19 12.07C19.69 11.54 20 10.82 20 10C20 8.3 18.7 6.84 17 6.84H14.2C14.2 4.17 12.03 2 9.36 2C7.31 2 5.56 3.28 4.85 5.08C2.72 5.14 1 6.89 1 9.04C1 11.22 2.78 13 4.96 13H8.1C8.04 13.33 8 13.66 8 14H7.5C5.57 14 4 15.57 4 17.5S5.57 21 7.5 21H18.5C21 21 23 19 23 16.5C23 14.26 21.34 12.41 19.19 12.07M18.5 19H7.5C6.67 19 6 18.33 6 17.5S6.67 16 7.5 16H10V14C10 12.07 11.57 10.5 13.5 10.5S17 12.07 17 14H18.5C19.88 14 21 15.12 21 16.5S19.88 19 18.5 19Z" /></svg>';
  }

  weatherText.textContent = `${weather}`;
  weatherDiv.appendChild(weatherIcon);
  weatherDiv.appendChild(weatherText);
}
