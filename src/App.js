import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0784f1b0eeae9eab1bf489ae9020501&units=metric`;

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
          <div className="temperature">{data.main ? data.main.temp : null}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
