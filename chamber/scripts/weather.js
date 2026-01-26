const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const forecastEl = document.getElementById("forecast");
const highEl = document.getElementById("high");
const lowEl = document.getElementById("low");
const humidityEl = document.getElementById("humidity");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const apiKey = "beeb1bdbb4c16c4b481c8ae4067c928d";
const city = "Bende, NG";

function toFahrenheit(celsius) {
  return Math.round(celsius * 9 / 5 + 32);
}

function formatTime(unixTimestamp, timezoneOffset) {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });
}

async function loadWeather() {
  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!currentRes.ok) throw new Error("Failed to fetch current weather");
    const currentData = await currentRes.json();

    const iconUrl = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

    const currentTempF = toFahrenheit(currentData.main.temp);
    const highF = toFahrenheit(currentData.main.temp_max);
    const lowF = toFahrenheit(currentData.main.temp_min);

    const timezone = currentData.timezone;
    const sunrise = formatTime(currentData.sys.sunrise, timezone);
    const sunset = formatTime(currentData.sys.sunset, timezone);

    // ---- Populate Current Weather ----
    tempEl.innerHTML = `<img src="${iconUrl}" alt="${currentData.weather[0].description}"> <strong>${currentTempF}°F</strong>`;
    descEl.innerHTML = `<strong>${currentData.weather[0].main}</strong>`;

    highEl.textContent = `High: ${highF}°F`;
    lowEl.textContent = `Low: ${lowF}°F`;
    humidityEl.textContent = `Humidity: ${currentData.main.humidity}%`;
    sunriseEl.textContent = `Sunrise: ${sunrise}`;
    sunsetEl.textContent = `Sunset: ${sunset}`;

    // ---- Populate Forecast ----
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
    const forecastData = await forecastRes.json();

    forecastEl.innerHTML = "";

    for (let i = 8; i <= 24; i += 8) {
      const item = forecastData.list[i];
      const date = new Date(item.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const tempF = toFahrenheit(item.main.temp);

      const div = document.createElement("div");
      div.innerHTML = `<strong>${dayName}</strong><br>${tempF}°F`;
      forecastEl.appendChild(div);
    }

  } catch (error) {
    console.error("Weather error:", error);
    tempEl.textContent = "Unable to load weather";
    descEl.textContent = "";
    highEl.textContent = "";
    lowEl.textContent = "";
    humidityEl.textContent = "";
    sunriseEl.textContent = "";
    sunsetEl.textContent = "";
    forecastEl.innerHTML = "";
  }
}

loadWeather();
