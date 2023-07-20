import React, { useState } from "react";
import Card from "./components/Card";
import "../src/Card.css";
import { IoSearch } from "react-icons/io5";
const API_KEY = "18f2ba39d8b76ccbd01e5a800a9d5d07";

const WeatherApp = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("city");
  const [metric, setMetric] = useState("metric");
  const [degree, setDegree] = useState("C");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = () => {
    let apiUrl = "";

    switch (selectedOption) {
      case "city":
        apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        break;
      case "zipcode":
        apiUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${city}&units=${metric}&appid=${API_KEY}`;
        break;
      case "coordinates":
        const [latitudes, longitudes] = city.split(" ");
        apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitudes}&lon=${longitudes}&units=${metric}&appid=${API_KEY}`;
        break;
      default:
        alert("Invalid location type");
        return;
    }

    fetch(
      apiUrl
      // `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (selectedOption == "city") {
          console.log(data.coord.lon);
          // console.log(data[0].coord.lat, data[0].coord.lon);
          getAdditionalData(data.coord.lat, data.coord.lon);
          // getAdditionalData(data[0].lat, data[0].lon);
        } else {
          parseWeatherData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
        alert(
          "An error occurred while fetching weather data. Please try again later."
        );
      });
  };

  const getAdditionalData = (latitude, longitude) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${metric}&appid=${API_KEY}`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // setWeatherData(data);
        console.log("1", data);
        console.log("2", weatherData);
        parseWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
        alert(
          "An error occurred while fetching weather data. Please try again later."
        );
      });
  };

  function toggleMetric() {
    console.log("oreeeeeeeeeees");
    if (metric == "metric") {
      setMetric("imperial");
      setDegree("F");
      fetchWeatherData();
    } else if (metric == "imperial") {
      setMetric("metric");
      setDegree("C");
      fetchWeatherData();
    }
  }

  const parseWeatherData = (data) => {
    console.log("eee", data);
    const city2 = data.city.name;
    const country2 = data.city.country;
    const weatherList = data.list;
    const weatherData2 = [];

    for (let i = 0; i < weatherList.length; i += 8) {
      //3h data so for diff of 24h +8 -> 3h*8=24h
      const weather = weatherList[i];
      console.log("fffmnjghjfhfgh", weather);
      console.log("dasdsddddd", weather.weather);
      console.log("dasdsddddd", weather.weather[0].icon);
      console.log("www", weather.weather[0].main);
      const date = new Date(weather.dt_txt);
      const temperature = Math.round(weather.main.temp);
      const minTemperature = Math.floor(weather.main.temp_min);
      const maxTemperature = Math.ceil(weather.main.temp_max);
      const weatherIcon = weather.weather[0].icon;
      const weather2 = weather.weather[0].main;
      const pressure = weather.main.pressure;
      const humidity = weather.main.humidity;
      const windSpeed = weather.wind.speed;

      weatherData2.push({
        date: date.toLocaleDateString("en-US", { weekday: "long" }),
        temperature,
        minTemperature,
        maxTemperature,
        weatherIcon,
        weather2,
        pressure,
        humidity,
        windSpeed,
      });
    }
    console.log("heree", weatherData2);
    setWeatherData(weatherData2);
    setCity(city2);
    setCountry(country2);

    return { city2, weatherData2 };
  };

  return (
    <div>
      <div class="topp">
        <h1
          style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "normal",
            marginTop: "5px",
            marginLeft: "10px",
          }}
        >
          WEATHER FORECAST (5 DAYS)
        </h1>
      </div>
      <div className="input-container">
        <select
          className="location-dropdown"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="city">City</option>
          <option value="coordinates">ID</option>
          <option value="zipcode">Zip Code</option>
        </select>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="location-input"
        />
        <div className="search-btn" onClick={fetchWeatherData}>
          <IoSearch />
        </div>
      </div>
      {weatherData && (
        <div>
          <div>
            <h2>
              {city}, {country}
            </h2>
            <h4>{weatherData[selectedCardIndex].date}</h4>
            <h4>{weatherData[selectedCardIndex].weather2}</h4>
          </div>
          <div className="selected-day">
            <img
              className="image-temp"
              src={`http://openweathermap.org/img/w/${weatherData[selectedCardIndex].weatherIcon}.png`}
              alt="Weather Icon"
            />
            <button className="toggle-temp" onClick={() => toggleMetric()}>
              <p className="today-temp">
                {weatherData[selectedCardIndex].temperature}
              </p>
              <p
                style={{
                  fontSize: "22px",
                  color: "dimgrey",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
              >
                °C |°F
              </p>
            </button>
            <div className="pressure-div">
              <h3>Humidity: {weatherData[selectedCardIndex].humidity}%</h3>
              <h3>Pressure: {weatherData[selectedCardIndex].pressure} hPa</h3>
              <h3>
                Wind Speed: {weatherData[selectedCardIndex].windSpeed} m/s
              </h3>
            </div>
          </div>
          <div style={{ display: "flex", margin: "20px" }}>
            <Card
              day={weatherData[0].date}
              weatherIcon={weatherData[0].weatherIcon}
              high={weatherData[0].maxTemperature}
              low={weatherData[0].minTemperature}
              isSelected={selectedCardIndex === 0}
              onClick={() => handleCardClick(0)}
            />
            <Card
              day={weatherData[1].date}
              weatherIcon={weatherData[1].weatherIcon}
              high={weatherData[1].maxTemperature}
              low={weatherData[1].minTemperature}
              isSelected={selectedCardIndex === 1}
              onClick={() => handleCardClick(1)}
            />
            <Card
              day={weatherData[2].date}
              weatherIcon={weatherData[2].weatherIcon}
              high={weatherData[2].maxTemperature}
              low={weatherData[2].minTemperature}
              isSelected={selectedCardIndex === 2}
              onClick={() => handleCardClick(2)}
            />
            <Card
              day={weatherData[3].date}
              weatherIcon={weatherData[3].weatherIcon}
              high={weatherData[3].maxTemperature}
              low={weatherData[3].minTemperature}
              isSelected={selectedCardIndex === 3}
              onClick={() => handleCardClick(3)}
            />
            <Card
              day={weatherData[4].date}
              weatherIcon={weatherData[4].weatherIcon}
              high={weatherData[4].maxTemperature}
              low={weatherData[4].minTemperature}
              isSelected={selectedCardIndex === 4}
              onClick={() => handleCardClick(4)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
