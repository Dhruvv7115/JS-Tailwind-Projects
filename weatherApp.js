document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-button');
  const weatherInfo = document.getElementById('weather-info');
  const city = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description')
  const errorMsg = document.getElementById('error')

  const API_KEY = '51ab0722c4d3e78fca0ce9ccaaab4a4d' //env variables

  getWeatherBtn.addEventListener('click', async() => {
    const cityValue = cityInput.value.trim();
    if(!cityValue) return;

    const weather = await fetchWeatherData(cityValue);
    // console.log(weather);

    displayWeatherData(weather);



  });

  async function fetchWeatherData(city){
    //
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

    const weather = await fetch(url);

    if(!weather.ok) {
      throw new Error('city not found')
    }

    const weatherData = await weather.json();
    return weatherData;
  }

  function displayWeatherData(data){
    console.log(data)
    const {name, main, weather} = data;
    
    city.textContent = name;

    const tempInC = parseInt(main.temp) - 273;
    temperature.textContent = `Temperature : ${tempInC}°C`;

    description.textContent = `Weather : ${weather[0].description}`;

    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');

  }

  function showErrorMsg(){
    weatherInfo.classList.add('hidden');
    errorMsg.classList.remove('hidden');
  }
});
