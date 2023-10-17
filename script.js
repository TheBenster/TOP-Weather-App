const API_KEY = "5d5ddc24a54942fcb90143007231707";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityDiv = document.querySelector(".city");
const convert = document.querySelector("#convert");

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  const processedData = processData(data);
  displayCity(processedData.cityName, processedData.region);
  displayWeather(processedData.weather, processedData.icon);
  displayTemp(processedData.temp);
  displayFeelsLike(processedData.humidity);
  displayUV(processedData.uv);
  displayWind(processedData.windDegree);
  console.log(data);
}

function processData(data) {
  const weather = data.current.condition.text;
  const icon = data.current.condition.icon;
  const temp = data.current.temp_c;
  const cityName = data.location.name;
  const region = data.location.region;
  const humidity = data.current.humidity;
  const uv = data.current.uv;
  const windDegree = data.current.wind_degree;
  // const forecast = data.forecast.forecastday.day.condition;
  // console.log(weather);
  return { weather, icon, temp, cityName, region, humidity, uv, windDegree };
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
    const formattedCity = country ? `${cityName},${region}` : cityName;
    cityDiv.innerHTML = "";
    getWeather(formattedCity);
  }
});
getWeather("London");
function displayCity(cityName, country) {
  let cityText = document.createElement("h4");
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
  tempText.textContent = `${temp}C°`;
  tempIcon.innerHTML =
    '<svg stroke="black" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thermometer</title><path d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z" /></svg>';
  tempDiv.appendChild(tempText);
  tempDiv.appendChild(tempIcon);
}

function displayFeelsLike(humidity) {
  let humidityDiv = document.querySelector(".humidity");
  let humidityNum = document.createElement("p");
  let humidityText = document.createElement("h3");
  humidityDiv.innerHTML = "";
  humidityText.textContent = "Humidity";
  humidityNum.textContent = `${humidity}%`;
  humidityDiv.appendChild(humidityNum);
  humidityDiv.appendChild(humidityText);
}

function displayUV(uv) {
  const uvDiv = document.querySelector(".uv");
  uvDiv.innerHTML = ""; // Clear previous content before adding new elements

  const uvBall = document.createElement("div");
  uvBall.classList.add("uvBall");
  uvBall.textContent = `${uv}`;
  if (uv > 6) {
    uvBall.style.backgroundColor = "red";
  } else if (uv > 3) {
    uvBall.style.backgroundColor = "yellow";
  } else {
    uvBall.style.backgroundColor = "green";
  }

  const uvText = document.createElement("p");
  uvText.textContent = "UV";

  uvDiv.appendChild(uvBall);
  uvDiv.appendChild(uvText);
}

function displayWind(windDegree) {
  let windChevron = document.querySelector("#wind");
  let windDegTxt = document.querySelector("#windDegrees");
  windChevron.style.transform = `rotate(${Number(windDegree)}deg)`;
  windDegTxt.textContent = `${windDegree}°`;
}
