import { useState } from "react";
import { getWeather } from "./api";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await getWeather(city);
      setWeather(response.data);
      setError("");
    } catch {
      setError("Error with the request");
      setWeather(null);
    }
  };
  return (
    <div>
      <h1>Weather Consult</h1>
      <input
        type="text"
        placeholder="Insert a city"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div>{error}</div>}
      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Description: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
