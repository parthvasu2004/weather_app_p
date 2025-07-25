const apiKey = "b4db07fe632f07cc1f9274266a854d9f";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weather = data.weather[0].main.toLowerCase();
      console.log("Weather:", weather);

      document.getElementById("temperature").textContent = `${Math.round(temp)}°C`;
      document.getElementById("location").textContent = data.name;
      document.getElementById("humidity").textContent = humidity;
      document.getElementById("windSpeed").textContent = windSpeed;

      updateWeatherIcon(weather);
    })
    .catch(() => {
      alert("Something went wrong!");
    });
}

function updateWeatherIcon(weather) {
  const icon = document.getElementById("weatherIcon");

  if (weather.includes("cloud")) icon.src = "images/clouds.png";
  else if (weather.includes("clear")) icon.src = "images/clear.png";
  else if (weather.includes("rain")) icon.src = "images/rain.png";
  else if (weather.includes("snow")) icon.src = "images/snow.png";
  else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) icon.src = "images/mist.png";
  else if (weather.includes("drizzle")) icon.src = "images/drizzle.png";
  else if (weather.includes("wind")) icon.src = "images/wind.png";
  else icon.src = "images/clouds.png";  // default fallback
}