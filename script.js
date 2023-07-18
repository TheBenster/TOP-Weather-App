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
}

function processData(data) {
  const weather = data.weather[0].main;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const cityName = data.name;
  const country = data.sys.country;
  console.log(country);
  return { weather, temp, description, cityName, country };
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  cityDiv.innerHTML = "";
  getWeather(city);
});

function displayCity(cityName, country) {
  let cityText = document.createElement("p");
  cityText.textContent = `${cityName}, ${country}`;
  cityDiv.appendChild(cityText);
}
