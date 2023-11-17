import React from "react";
import { useState } from "react";
import cloud from "../assets/cloud.png";
import clear from "../assets/clear.png";
import drizzle from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import rain from "../assets/rain.png";


const Header = () => {
  let [mylocation, setmyLocation] = useState("");
  let [loc, setLoc] = useState('');
  let [temp, setTemp] = useState(0);
  let [windSpeed, setWindSpeed] = useState(0);
  let [time, setTime] = useState('');
  let [weather, setWeatherIcon]  = useState('');
  let [drsc, setDrsc] = useState('');
  let [humidity, setHumidity] = useState(0);


  let api2 = `http://api.weatherstack.com/current?access_key=8802be3f1a14578cedb4b7fb25ea48b0&query=${mylocation}`;

  const handleChange = (event) => {
    setmyLocation(event.target.value);
    // console.log('value is:', event.target.value);
  };

  const submit = async () => {
    console.log('blicked');
    let response = await fetch(api2);
    let res = await response.json();
    // console.log(response);
    
    console.log(res)
    setLoc(res.location.name);
    setTemp(res.current.temperature);
    setTime(res.current.observation_time)
    setWindSpeed(res.current.wind_speed);
    setmyLocation(res.location.name);
    setWeatherIcon(res.current.weather_icons[0]);
    setDrsc(res.current.weather_descriptions[0]);
    setHumidity(res.current.humidity);
    
  };
  return (
    <div className="outer fl fl-cl">
      <div className="search-cntr">
        <input
          type="text"
          value={mylocation}
          name="serch"
          id="serch"
          placeholder="Serch any Location"
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={submit}>
          Search
        </button>
      </div>

      <div className="container fl fl-cl">
        <h2>{time}</h2>
        <img src={weather} alt="" />
        <h3>{drsc}</h3>

        <h1>
          {temp}<sup>0</sup>c
        </h1>
        <h1>{loc}</h1>
      </div>

      <div className="bottom">
        <div className="humi">
          <img src={humidity_icon} alt="" />
          <p>{humidity}</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <img src={wind} alt="" />
          <p>{windSpeed}</p>
          <p>Wind speed</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
