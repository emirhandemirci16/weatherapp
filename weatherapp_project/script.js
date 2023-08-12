const cityInput = document.getElementById("cityInput");
const getWeatherButton = document.getElementById("getWeatherButton");
const weatherInfo = document.getElementById("weatherInfo");

const apiKey = "cbddfaeedff95d9dfbebbb76021b3a62";

getWeatherButton.addEventListener("click", () => {
  const cityName = cityInput.value;
  if (cityName.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  fetchWeather(cityName);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherInfo.textContent = "City not found. Please check the spelling.";
      return;
    }

    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    weatherInfo.innerHTML = `
      <h2>Weather in ${city}</h2>
      <p>Description: ${weatherDescription}</p>
      <p>Temperature: ${temperature}°C</p>
      <p>Humidity: ${humidity}%</p>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherInfo.textContent = "An error occurred. Please try again later.";
  }
}
