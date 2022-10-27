import './style.css';

async function getWeather() {
  try {
    const weather = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=x&APPID=3e233451c61ab3f7ea8c60d2980c48ea'
    );
    const weatherJSON = await weather.json();
    console.log(weatherJSON);
  } catch (error) {
    console.log(error);
  }
}

getWeather();