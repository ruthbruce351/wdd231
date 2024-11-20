const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&units=imperial&appid=647413f051c76f922505a7e87a4391ab`;


const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data);
    } else {
      throw new Error('Failed to fetch weather data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}°F`; 

  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  let desc = data.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);

  captionDesc.textContent = `${desc}`;
}

apiFetch();
