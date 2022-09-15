export {getWeeklyForecast}

const API_KEY = '7dd96f5392e51d63d9951fd686de3478';
async function getWeeklyForecast(cityName, unit){
  const coords = await getGeoCode(cityName) 
  const lat = coords.lat;
  const lon =  coords.lon;
 
  const forecastData = await getForecast(lat, lon, unit)
  const formattedForecast = formatData(forecastData, unit)
  
  return formattedForecast
}

async function getGeoCode(cityName){
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`)
    if (!response.ok) {
      throw Error(response.status);
    }
    
    const data = await response.json()
  
    const lat = data[0].lat;
    const lon = data[0].lon;

    if(lat === undefined || lon === undefined) return 

    return {lat, lon}
 }

 async function getForecast(lat, lon, unit){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`)
    if (!response.ok) {
      throw Error(response.status);
    }

    const data = await response.json()
  
    const day1 = data.list[5]
    const day2 = data.list[13]
    const day3 = data.list[21]
    const day4 = data.list[29]
    const day5 = data.list[37]

     return [day1, day2, day3, day4, day5]
 }

 function formatData(forecastData, currentUnit){
  const unit = currentUnit === 'metric' ? '°C' : '°F';

    const forecastObjs = forecastData.map(day => {
       const averageTemp = Math.round(day.main.temp).toString().concat(unit);
       const icon = day.weather[0].icon;

       const date = day.dt_txt;
       const dateObject = new Date(date)
       const dayOfTheWeek = dateObject.getDay()
       const dayName = getDayName(dayOfTheWeek);

       return {averageTemp, icon, dayName}
    })

   return forecastObjs
 }

 function getDayName(dayNumber){
  let day
  
  if(dayNumber === 0) return day = 'Sun'

  if(dayNumber === 1) return day = 'Mon'

  if(dayNumber === 2) return  day = 'Tue'
  
  if(dayNumber === 3)  return day = 'Wed'

  if(dayNumber === 4) return day = 'Thu'
    
  if(dayNumber === 5) return day = 'Fri' 
  
  if(dayNumber === 6) return day = 'Sat'
 }
