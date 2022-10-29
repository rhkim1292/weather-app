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

const processJSON = async (promise) => {
  const processed = {};
  const response = await promise;
  processed['location'] = response.name;
  processed['feels_like'] = response.main.feels_like;
  processed['temp'] = response.main.temp;
  processed['temp_min'] = response.main.temp_min;
  processed['temp_max'] = response.main.temp_max;
  processed['humidity'] = response.main.humidity;
  processed['weather'] = response.weather[0].main;
  return processed;
};

const locationForm = document.createElement('form');
locationForm.setAttribute('id', 'location-form');
const inputLabel = document.createElement('label');
inputLabel.setAttribute('for', 'locationInput');
inputLabel.textContent = 'Give me the weather information for:';
const locationInput = document.createElement('input');
locationInput.setAttribute('id', 'locationInput');
locationInput.setAttribute('name', 'location_name');
locationInput.setAttribute('placeholder', 'City Name');
const submitBtn = document.createElement('button');
submitBtn.setAttribute('type', 'submit');
submitBtn.textContent = 'GO';
locationForm.append(inputLabel, locationInput, submitBtn);

const displayContainer = document.createElement('div');
const locationH2 = document.createElement('h2');
const tempH1 = document.createElement('h1');
const weatherH4 = document.createElement('h4');
const highLowTempH4 = document.createElement('h4');
displayContainer.append(locationH2, tempH1, weatherH4, highLowTempH4);
displayContainer.style.display = 'none';

const newLocationBtn = document.createElement('button');
newLocationBtn.textContent = 'New Loc';
newLocationBtn.style.display = 'none';
newLocationBtn.setAttribute('id', 'newLocationBtn');
newLocationBtn.addEventListener('click', (e) => {
  displayContainer.style.display = 'none';
  locationForm.style.display = 'flex';
  newLocationBtn.style.display = 'none';
  responseTimeDisplay.style.display ='none';
});

const responseTimeDisplay = document.createElement('p');
responseTimeDisplay.setAttribute('id', 'responseTimeDisplay');
responseTimeDisplay.style.display = 'none';

document.body.append(locationForm, newLocationBtn, displayContainer, responseTimeDisplay);

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(locationForm);
  const submittedLocationName = formData.get('location_name');
  const responseBeginTime = performance.now();
  processJSON(getWeather(submittedLocationName)).then((res) => {
    const responseEndTime = performance.now();
    const responseTime = responseEndTime - responseBeginTime;
    responseTimeDisplay.textContent = `API Response Time: ${responseTime.toFixed(2)} ms`;
    responseTimeDisplay.style.display = 'block';
    locationForm.style.display = 'none';
    locationForm.reset();
    locationH2.textContent = res.location;
    tempH1.innerHTML = `${Math.floor(res.temp)}&#176`;
    weatherH4.textContent = res.weather;
    highLowTempH4.innerHTML = `H: ${Math.floor(res.temp_max)}&#176 L: ${Math.floor(res.temp_min)}&#176`;
    newLocationBtn.style.display = 'block';
    displayContainer.style.display = 'block';
  });
});
