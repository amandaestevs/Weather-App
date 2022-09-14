export {setBackground}

function setBackground(icon){
   const background = document.querySelector('.main-weather');

   if(icon === '01d' || icon === '02d'){
      background.style.backgroundImage  = 'url(img/clear-day.jpg)'
      lightMode()
   }

   if(icon === '01n' || icon === '02n'){
    background.style.backgroundImage  = 'url(img/clear-night.jpg)'
    darkMode()
   }

   if(icon === '03d' || icon === '04d'){
    background.style.backgroundImage = 'url(img/cloudy-day.jpg)'
     lightMode()
   }

   if(icon === '03n' || icon === '04n'){
    background.style.backgroundImage  = 'url(img/cloudy-night.jpg)'
    darkMode()
   }

   if(icon === '09d' || icon === '10d' || icon === '11d'){
    background.style.backgroundImage  = 'url(img/rainy-day.jpg)'
    lightMode()
   }

   if(icon === '09n' || icon === '10n' || icon === '11n'){
    background.style.backgroundImage  = 'url(img/rainy-night.jpg)'
    lightMode()
   }

   if(icon === '13d' || icon === '13n'){
    background.style.backgroundImage  = 'url(img/snow.jpg)'
    lightMode()
   }

   if(icon === '50d' || icon === '50n'){
    background.style.backgroundImage  = 'url(img/mist.jpg)'
    lightMode()
   }
}

function lightMode(){
    const infoContainer = document.querySelector('.current-weather-info');
    const maxTemp = document.querySelector('.max');

    infoContainer.classList.add('day-mode');
    maxTemp.classList.add('day-mode');

    infoContainer.classList.remove('dark-mode');
    maxTemp.classList.add('dark-mode');
}

function darkMode(){
    const infoContainer = document.querySelector('.current-weather-info');
    const maxTemp = document.querySelector('.max');

    infoContainer.classList.add('dark-mode');
    maxTemp.classList.add('dark-mode');

    infoContainer.classList.remove('day-mode');
    maxTemp.classList.remove('day-mode');
}