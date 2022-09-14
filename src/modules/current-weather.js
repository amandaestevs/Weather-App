export {getCurrentWeather}

const API_KEY = '7dd96f5392e51d63d9951fd686de3478';

async function getCurrentWeather(cityName, unit){
  const coords = await getGeoCode(cityName) 
  if(!coords) return 'not found';
  
  const lat = coords.lat;
  const lon =  coords.lon;

  const weatherData = await getWeatherData(lat, lon, unit);
  if(!weatherData) return 'not found';

  const formattedData = formatData(weatherData, unit)
  
  return formattedData
}

async function getGeoCode(cityName){
   const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`)
   if (!response.ok) {
      throw Error(response.status);
   }

   const data = await response.json()
   if(!data[0]) return 

   const lat = data[0].lat;
   const lon = data[0].lon;
   
   return {lat, lon}
}

async function getWeatherData(lat, lon, unit){
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`)
   if (!response.ok) {
      throw Error(response.status);
   }
   
   const data = await response.json()
   
   const temp = data.main.temp;
   const maxTemp = data.main.temp_max;
   const minTemp = data.main.temp_min;
   const humidity = data.main.humidity;
   const feelsLike = data.main.feels_like;

   const timezone = data.timezone;
   const country = data.sys.country;
   const wind = data.wind.speed;

   const description = data.weather[0].description;
   const main = data.weather[0].main;
   const icon = data.weather[0].icon;
   
   return {temp, maxTemp, minTemp, humidity, feelsLike, timezone, country, description, main, icon, wind}
}

function formatData(weatherData, currentUnit){
   const unit = currentUnit === 'metric' ? '°C' : '°F';
   const windUnit = currentUnit === 'metric' ? 'km/h' : 'm/s';

   const temp = Math.round(weatherData.temp).toString().concat(unit);
   const maxTemp = Math.round(weatherData.maxTemp).toString().concat(unit);
   const minTemp = Math.round(weatherData.minTemp).toString().concat(unit);
   const feelsLike = Math.round(weatherData.feelsLike).toString().concat(unit) ;
   const humidity = weatherData.humidity.toString().concat('%');
   
   const timezone = weatherData.timezone;
   const country = weatherData.country;

   const windData = weatherData.wind;
   const wind = formatWind(windData, windUnit)

   const description = weatherData.description;
   const icon = weatherData.icon;
   const main = weatherData.main;

   return {temp, maxTemp, minTemp, humidity, feelsLike, timezone, country, description, main, icon, wind}
}

function formatWind(windData, unit){
   let wind
   if(unit === 'km/h') {
      let windInKmPerH = windData * 3.6;
      wind = windInKmPerH.toFixed(2)
      return wind = wind.toString().concat(unit)
    }
    if(unit === 'm/s'){
       return wind = windData.toString().concat(unit)
    }
}
