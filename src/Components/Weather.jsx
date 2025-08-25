import "./Weather.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_Key = "2857719c72fd6910e42f33cf56ed9e5d";

  useEffect(() => {
    const getApi = async () => {
      
      try {
        const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=24.8607&lon=67.0011&units=metric&appid=${API_Key}`
      );
      console.log(response.data);
      setIsLoading(false);
      setWeather(response.data);
    }
    catch (err) {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
    }
      }
      getApi();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something Went Wrong!</h1>;

  return (
    <>
      <h1>Check your city weather</h1>
      {weather && (
        <div>
            <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </>
  );
}
export default Weather;
