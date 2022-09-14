import { getCurrentWeather } from "./modules/current-weather.js";
import { setBackground } from "./modules/background.js";
import { getWeeklyForecast } from "./modules/weekly-forecast.js";

const inputField = document.getElementById("input-field");
const searchBtn = document.getElementById("search-btn");
const unitBtn = document.getElementById("unit-btn");

window.addEventListener("load", () => {
  let city = "Sao Paulo";
  let unit = "metric";
  getWeather(city, unit);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitForm();
  }
});

searchBtn.addEventListener("click", submitForm);

function submitForm() {
  const cityName = inputField.value;
  const currentUnit = metric ? "metric" : "imperial";
  getWeather(cityName, currentUnit);
}

//change unit
let metric = true;
unitBtn.addEventListener("click", () => {
  if (unitBtn.textContent === "°C") return changeToImperial();
  if (unitBtn.textContent === "°F") return changeToMetric();
});

function changeToImperial() {
  metric = false;
  unitBtn.textContent = "°F";
  convertWeather();
}

function changeToMetric() {
  metric = true;
  unitBtn.textContent = "°C";
  convertWeather();
}

function convertWeather() {
  const cityName = document.querySelector(".city-name").textContent;
  const currentUnit = metric ? "metric" : "imperial";
  getWeather(cityName, currentUnit);
}

//fetch weather data
async function getWeather(cityName, unit) {
  if (cityName === "" || cityName.length === 1) return;

  displayLoader();

  const currentWeatherData = await getCurrentWeather(cityName, unit);
  if(currentWeatherData === 'not found') return notFound(cityName)

  const weeklyForecast = await getWeeklyForecast(cityName, unit);

  populateMainWeather(cityName, currentWeatherData);
  populateForecast(weeklyForecast);

  hideLoader();
}

function notFound(name){
    alert(`${name} not found. Search must be in form of "city" or "city, country code".`)
    hideLoader()
}

//current weather
function populateMainWeather(name, data) {
  setBackground(data.icon);
  currentTime(data.timezone);

  const cityName = setName(name, data.country);
  const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;

  document.querySelector(".city-name").textContent = cityName;
  document.querySelector(".icon").setAttribute("src", `${iconUrl}`);

  document.querySelector(".temp").textContent = data.temp;
  document.querySelector(".description").textContent = data.description;

  document.querySelector(".wind").querySelector(".value").textContent =
    data.wind;
  document.querySelector(".humidity").querySelector(".value").textContent =
    data.humidity;
  document.querySelector(".feels-like").querySelector(".value").textContent =
    data.feelsLike;

  document.querySelector(".wind").querySelector(".title").textContent = "Wind";
  document.querySelector(".humidity").querySelector(".title").textContent =
    "Humidity";
  document.querySelector(".feels-like").querySelector(".title").textContent =
    "Feels Like";

  document.querySelector(".max").querySelector(".value").textContent =
    data.maxTemp;
  document.querySelector(".min").querySelector(".value").textContent =
    data.minTemp;

  document.querySelector(".max").querySelector(".title").textContent = "Max";
  document.querySelector(".min").querySelector(".title").textContent = "Min";
}

function setName(name, country) {
  let place = `${name}, ${country}`;
  const cityName =
    place.split(",").length > 2
      ? `${place.split(",")[0]},${place.split(",").pop()}`
      : place;
  return cityName;
}

//local time
function currentTime(timezone) {
  const localTime = new Date().getTime();
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const currentUtcTime = localOffset + localTime;
  const cityOffset = currentUtcTime + 1000 * timezone;
  const cityTime = new Date(cityOffset).toDateString();

  document.querySelector(".time-info").textContent = cityTime;
}

//weekly forecast
function populateForecast(weeklyForecast) {
  const forecastContainer = document.querySelector(".forecast-container");
  forecastContainer.innerHTML = "";

  const cardTemplate = document.getElementById("template");

  weeklyForecast.forEach((day) => {
    const element = cardTemplate.content.cloneNode(true);
    const iconUrl = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;

    element.querySelector(".day-of-the-week").textContent = day.dayName;
    element.querySelector(".icon-of-the-day").setAttribute("src", `${iconUrl}`);
    element.querySelector(".average-temp").textContent = day.averageTemp;

    forecastContainer.append(element);
  });
}

//loader functions
function displayLoader() {
   const loader = document.getElementById("loader");
   const loadingPage = document.querySelector('.loading-page');

   loader.style.display = "block";
   loadingPage.style.display = "flex";
}

function hideLoader() {
   const loader = document.getElementById("loader");
   const loadingPage = document.querySelector('.loading-page');

   loader.style.display = "none";
   loadingPage.style.display = "none";
}
