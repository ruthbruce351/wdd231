document.addEventListener('DOMContentLoaded', function () {
    
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            
            const selectedBusinesses = [];
            while (selectedBusinesses.length < 3) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomBusiness = data[randomIndex];
                if (!selectedBusinesses.includes(randomBusiness)) {
                    selectedBusinesses.push(randomBusiness);
                }
            }

            const spotlightSection = document.querySelector('.spotlight-section');
            spotlightSection.innerHTML = ''; 

            selectedBusinesses.forEach(business => {
                const businessCard = document.createElement('div');
                businessCard.id = 'business-card';

                businessCard.innerHTML = `
                    <h3>${business.name}</h3>
                    <p><i>${business.tagLine}</i></p>
                    <hr>
                    <div id="photo-info">
                        <div class="image">
                            <img src="${business.image}" alt="${business.name}">
                        </div>
                        <div class="info">
                            <p><strong>Email:</strong> ${business.email}</p>
                            <p><strong>Phone:</strong> ${business.phone}</p>
                            <p><strong>URL:</strong> <a href="${business.website}" target="_blank">${business.website}</a></p>
                        </div>
                    </div>
                `;

                spotlightSection.appendChild(businessCard);
            });
        })
        .catch(error => console.error('Error fetching the member data:', error));

    const apiKey = '647413f051c76f922505a7e87a4391ab';

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Carrollton,US&units=imperial&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Carrollton,US&units=imperial&cnt=24&appid=${apiKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const highTemp = data.main.temp_max;
            const lowTemp = data.main.temp_min;
            const humidity = data.main.humidity;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            document.getElementById('current-temp').textContent = `Temperature: ${temp}°F`;
            document.getElementById('current-description').textContent = `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
            document.getElementById('current-icon').src = iconURL;
            document.getElementById('current-icon').alt = "Current Weather Icon";
            document.getElementById('current-high').textContent = `High: ${highTemp}°F`;
            document.getElementById('current-low').textContent = `Low: ${lowTemp}°F`;
            document.getElementById('current-humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('sunrise').textContent = `Sunrise: ${sunrise}`;
            document.getElementById('sunset').textContent = `Sunset: ${sunset}`;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            document.getElementById('current-temp').textContent = 'Failed to fetch data';
            document.getElementById('current-description').textContent = 'Try again later';
        });

    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast-container');
            const forecast = data.list;

            const currentDate = new Date();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const today = currentDate.getDay();
            const forecastDays = [
                daysOfWeek[(today + 1) % 7], 
                daysOfWeek[(today + 2) % 7], 
                daysOfWeek[(today + 3) % 7] 
            ];

            let forecastIndex = 0;
            let forecastDayData = {};

            for (let i = 0; i < forecast.length; i++) {
                const dayData = forecast[i];
                const date = new Date(dayData.dt * 1000); 
                const dayOfWeek = daysOfWeek[date.getDay()];

                if (forecastDays.includes(dayOfWeek)) {
                    if (!forecastDayData[dayOfWeek]) {
                        forecastDayData[dayOfWeek] = [];
                    }

                    forecastDayData[dayOfWeek].push(dayData);

                    if (Object.keys(forecastDayData).length === 3) {
                        break;
                    }
                }
            }


            for (let day in forecastDayData) {
                const dayData = forecastDayData[day];

                const highTemp = Math.max(...dayData.map(item => item.main.temp));
                const lowTemp = Math.min(...dayData.map(item => item.main.temp));

                const icon = dayData[0].weather[0].icon;
                const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                const dayDiv = document.createElement('div');
                dayDiv.classList.add('forecast-day');

                dayDiv.innerHTML = `
                    <hr>
                    <section>
                        <h3><strong>${day}</strong></h3>
                    </section>
                    <section>
                        <img src="${iconURL}" alt="Weather Icon">
                        <p>High: ${Math.round(highTemp)}°F</p>
                        <p>Low: ${Math.round(lowTemp)}°F</p>
                    </section>
                    <hr>
                `;

                forecastContainer.appendChild(dayDiv);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
