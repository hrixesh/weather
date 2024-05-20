const weatherBox = document.querySelector("#weather-box");
cityInput = document.querySelector("#cityInput");

cityInput.addEventListener(
    "keyup",

    async function (event) {
        if (event.key == "Enter") {
            const cityName = event.target.value;
            if (cityName == "") {
                cityInput.focus();
                return;
            }
            weatherBox.innerHTML = `<div class="loader mb-4">
                                                    <i class="fas fa-spinner fa-spin fa-2x"></i>
                                                    </div>`;

            cityInput.disabled = true;
            const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=21805bff7224936fa25d6cec016a0a4b&units=metric`;

            const response = await fetch(API);
            cityInput.disabled = false;

            if (response.status == 200) {
                const data = await response.json();
                weatherBox.innerHTML = `<div class="weather-icon mb-4">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                    </div>
                    <div class="weather-info mb-4">
                        <h2 class="mb-3">${cityName}</h2>
                        <p>Temperature: ${data.main.temp}</p>
                        <p>Condition: ${data.weather[0].main}</p>
                    </div>
                    `;

            } else if (response.status == 404) {
                weatherBox.innerHTML = `<h2> Enter valid data`;
            }

        }
    }
)


