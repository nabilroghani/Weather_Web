import "./Weather.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Karachi"); // default city
  const [search, setSearch] = useState(""); // input value
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_Key = "2857719c72fd6910e42f33cf56ed9e5d";

  const getWeather = async (cityName) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_Key}`
      );
      setWeather(response.data);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setWeather(null);
    }
    setIsLoading(false);
  };

  // default call
  useEffect(() => {
    getWeather(city);
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      setCity(search);
      getWeather(search);
      setSearch("");
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>City not found ❌</h1>;

  return (
    <div className="weather">
  <h1>🌤 Weather App</h1>

  {/* Search box */}
  <div>
    <input
      type="text"
      placeholder="Enter city name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter se bhi chalega
    />
    <button onClick={handleSearch}>Search</button>
  </div>

  {/* Weather Info */}
  {weather && (
    <div className="weather-info">
      <h2>{weather.name}</h2>
      <p>🌡 Temp: {weather.main.temp}°C</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>☁ Condition: {weather.weather[0].description}</p>
    </div>
  )}
</div>

  );
}

export default Weather;
