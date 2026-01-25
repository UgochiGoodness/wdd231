const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const forecastEl = document.getElementById("forecast");

// OpenWeatherMap API key
const apiKey = "beeb1bdbb4c16c4b481c8ae4067c928d";
const city = "Bende, NG";

async function loadWeather() {
  try {
    // Fetch current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!currentRes.ok) throw new Error("Failed to fetch current weather");
    const currentData = await currentRes.json();

    tempEl.textContent = `Current: ${Math.round(currentData.main.temp)}°C`;
    descEl.textContent = `Conditions: ${currentData.weather[0].description}`;

    // Fetch 5-day / 3-hour forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
    const forecastData = await forecastRes.json();

    forecastEl.innerHTML = "";

    // Pick roughly one forecast per day (every 8th item in 3-hour interval array)
    for (let i = 8; i <= 24; i += 8) {
      const forecastItem = forecastData.list[i];
      const date = new Date(forecastItem.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      const forecastDiv = document.createElement("div");
      forecastDiv.textContent = `${dayName}: ${Math.round(forecastItem.main.temp)}°C, ${forecastItem.weather[0].description}`;
      forecastEl.appendChild(forecastDiv);
    }
  } catch (error) {
    console.error("Weather error:", error);
    tempEl.textContent = "Unable to load weather";
    descEl.textContent = "";
    forecastEl.innerHTML = "";
  }
}

loadWeather();
