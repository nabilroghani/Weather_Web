import "./Weather.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Karachi");
  const [search, setSearch] = useState("");
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

  // ✅ Background image condition-wise
  const getBackground = () => {
    if (!weather) return "linear-gradient(135deg,#4facfe,#00f2fe)";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "url('https://i.ibb.co/DQv7TGb/cloudy.jpg')";
    if (main.includes("rain")) return "url('https://i.ibb.co/vB6PJxw/rainy.jpg')";
    if (main.includes("clear")) return "url('https://i.ibb.co/ScMZyjc/sunny.jpg')";
    if (main.includes("snow")) return "url('https://i.ibb.co/6gsdZjH/snow.jpg')";
    return "linear-gradient(135deg,#4facfe,#00f2fe)";
  };

  if (isLoading)
    return (
      <div className="weather" style={{ background: "#0077ff" }}>
        <div className="loader"></div>
        <h2>Loading Weather...</h2>
      </div>
    );

  if (isError)
    return (
      <div className="weather" style={{ background: "#f87171" }}>
        <h2>❌ City not found</h2>
      </div>
    );

  return (
    <div
      className="weather"
      style={{
        background: getBackground(),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1>🌤 Weather App</h1>

      {/* Search box */}
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
