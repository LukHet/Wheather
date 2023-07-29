import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [airData, setAirData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [lattitude, setLattitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");

  const token = "e0784f1b0eeae9eab1bf489ae9020501";

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`;

  const airUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lattitude}&lon=${longitude}&appid=${token}`;

  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lattitude}&lon=${longitude}&appid=${token}&units=metric`;

  const searchCity = (e) => {
    if (e.key === "Enter") {
      axios
        .get(weatherUrl)
        .then((response) => {
          setWeatherData(response.data);
          setLattitude(response.data.coord.lat);
          setLongitude(response.data.coord.lon);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (weatherData.main) {
      axios
        .get(airUrl)
        .then((response) => {
          setAirData(response.data.list[0].components);
        })
        .catch((error) => console.log(error));

      axios
        .get(forecastUrl)
        .then((response) => {
          console.log(response.data.list);
          setForecast(response.data.list);
        })
        .catch((error) => console.log(error));
    }
  }, [weatherData, airUrl, forecastUrl]);

  const forecasts = forecast.slice(0, 9).map((forecast) => (
    <li key={forecast.dt}>
      <div className="forecastdate">{forecast.dt_txt.slice(0, 16)}</div>
      <div className="forecasttemp">
        {forecast.main.temp.toFixed()}
        &deg;C
      </div>
      <img
        alt=""
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        className="icon"
      ></img>
    </li>
  ));

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="app">
      <div className="appfield">
        <input
          type="text"
          className="searchfield"
          onChange={handleChange}
          onKeyDown={searchCity}
          placeholder="Type your city..."
        />
        <div className="top">
          {weatherData.main ? (
            <>
              <div className="cityname">{weatherData.name}</div>
              <div className="temperature">
                {weatherData.main.temp.toFixed()}&deg;C
              </div>
              <div className="weather">
                <div className="description">
                  {weatherData.weather[0].description}
                </div>
                <img
                  alt=""
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  className="icon"
                ></img>
              </div>
            </>
          ) : null}
        </div>
        <div className="middle">
          {weatherData.main ? (
            <>
              <div className="humidity">
                Humidity
                <div className="value">{weatherData.main.humidity}%</div>
              </div>
              <div className="pressure">
                Pressure
                <div className="value">{weatherData.main.pressure}hPa</div>
              </div>
              <div className="wind">
                Wind speed
                <div className="value">
                  {weatherData.wind.speed.toFixed()} m/s
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="bottom">
          {airData.co ? (
            <>
              <div className="co">
                CO
                <div className="value">{airData.co}</div>
              </div>
              <div className="no">
                NO
                <div className="value">{airData.no}</div>
              </div>
              <div className="NO2">
                NO2
                <div className="value">{airData.no2}</div>
              </div>
              <div className="O3">
                O3
                <div className="value">{airData.o3}</div>
              </div>
              <div className="SO2">
                SO2
                <div className="value">{airData.so2}</div>
              </div>
              <div className="PM2_5">
                PM2_5
                <div className="value">{airData.pm2_5}</div>
              </div>
              <div className="PM10">
                PM10
                <div className="value">{airData.pm10}</div>
              </div>
              <div className="NH3">
                NH3
                <div className="value">{airData.nh3}</div>
              </div>
            </>
          ) : null}
        </div>
        <div className="forecasts">{forecasts}</div>
      </div>
    </div>
  );
};

export default App;
