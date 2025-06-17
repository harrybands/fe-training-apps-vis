function getWeather() {
    const apiKey = "fbfd4d9482d96e51bd8fa8ad108c2cc1";
    const citySearch = document.getElementById('city');
    const cityText = citySearch.value.trim();
    const errorMsg = document.getElementById('error');
    const urlGetCurrentWeatherInfo =`https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=${apiKey}`;
    const urlGetForecastWeatherInfo = `https://api.openweathermap.org/data/2.5/forecast?q=${cityText}&appid=${apiKey}`;

    console.log(citySearch);

    if (!cityText) {
        console.log('errorMsg attr thi rang: ', errorMsg);
        if (errorMsg) {
            errorMsg.textContent = 'Vui lòng nhập thành phố bạn muốn'
            errorMsg.style.display = 'block';
        }
        return;
    }
    if(errorMsg) {
        errorMsg.style.display = 'none';
    }

    fetch(urlGetCurrentWeatherInfo).then(response => response.json())
                            .then(data => {
                                displayWeather(data);
                            })
                            .catch(error => {
                                console.error('error while fetching: ', error);
                                errorMsg.textContent ='Lỗi xảy ra khi lấy nhiệt độ hiện tại, vui lòng thử nhập lại.'
                            })
    fetch(urlGetForecastWeatherInfo).then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            errorMsg.textContent ='Lỗi xảy ra khi lấy nhiệt độ tương lai, vui lòng thử nhập lại.'
        });
}

function displayWeather(data) {
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const hourlyForecast = document.getElementById('hourly-forecast');
    const weatherIcon = document.getElementById('weather-icon');

    tempDiv.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourlyForecast.innerHTML = '';

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
    else {
        const cityName = data.name;
        console.log("🚀 ~ displayWeather ~ data:", data)
        console.log("🚀 ~ displayWeather ~ cityName:", cityName)
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        console.log("🚀 ~ displayWeather ~ temperature:", temperature)
        const description = data.weather[0].description;
        console.log("🚀 ~ displayWeather ~ description:", description)
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;
        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;
        tempDiv.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

    }

}

function displayHourlyForecast(hourlyData) {
    const hourlyForecast = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecast.innerHTML += hourlyItemHtml;
    });
}