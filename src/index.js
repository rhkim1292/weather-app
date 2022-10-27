import './style.css';

async function getWeather(location) {
  if (typeof location !== 'string')
    throw new Error('A string must be passed into getWeather!');
  try {
    const weather = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=3e233451c61ab3f7ea8c60d2980c48ea`
    );
    const weatherJSON = await weather.json();
    return weatherJSON;
  } catch (error) {
    console.log(error);
  }
}

const processJSON = (promise) => {
  const processed = {};
  promise.then((response) => {
    console.log(response);
    processed['location'] = response.name;
    processed['feels_like'] = response.main.feels_like;
    processed['temp'] = response.main.temp;
    processed['temp_min'] = response.main.temp_min;
    processed['temp_max'] = response.main.temp_max;
    processed['humidity'] = response.main.humidity;
    processed['weather'] = response.weather[0].main;
  });
  return processed;
};

console.log(processJSON(getWeather('Los Angeles')));
