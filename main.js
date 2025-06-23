const city = document.getElementById('city').value;
const apiKey = `8669b5a7b4284977983174054250705`; 
const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
const cityInput = document.getElementById('city');
const suggestionsBox = document.getElementById('suggestions');


document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
cityInput.addEventListener("input", showsuggestions);

async function showsuggestions() {
    const query = cityInput.value
    if (query.length < 2) {
        suggestionsBox.innerHTML = "";
        return;
    }

    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`;
    try {
        const res = await fetch(url);
        const cities = await res.json();

        suggestionsBox.innerHTML = ``;
        cities.forEach(city => {
            const div = document.createElement("div");
            div.textContent = city.region
              ? `${city.name}, ${city.region}, ${city.country}`
              : `${city.name}, ${city.country}`;
            div.addEventListener("click", () => {
            cityInput.value = city.region
            ? `${city.name}, ${city.region}, ${city.country}`
            : `${city.name}, ${city.country}`;
                suggestionsBox.innerHTML = "";
            });
            suggestionsBox.appendChild(div);
        });
    } catch (err) {
        suggestionsBox.innerHTML = "";
    }
}

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = `8669b5a7b4284977983174054250705`; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");

        const data = await response.json();
        document.getElementById("weather").innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>${data.current.condition.text}</strong></p>
      <img src="${data.current.condition.icon}" alt="weather icon">
      <p>Temperature: ${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind: ${data.current.wind_mph} kph</p>
      `;
    } catch (error) {
    document.getElementById("weather").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
    
