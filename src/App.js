import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  const token = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`;

  const searchCity = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

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
          {data.main ? (
            <>
              <div className="cityname">{data.name}</div>
              <div className="temperature">
                {data.main.temp.toFixed()}&deg;C
              </div>
              <div className="weather">
                <div className="description">{data.weather[0].description}</div>
                <img
                  alt=""
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  className="icon"
                ></img>
              </div>
            </>
          ) : null}
        </div>
        <div className="bottom">
          {data.main ? (
            <>
              <div className="humidity">
                Humidity <div className="value">{data.main.humidity}%</div>
              </div>
              <div className="pressure">
                Pressure <div className="value">{data.main.pressure}hPa</div>
              </div>
              <div className="wind">
                Wind speed <div className="value">{data.wind.speed} m/s</div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
