import React, { useState } from "react";
import Card from "./components/Card";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const WeatherApp = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      });
  };

  return (
    <div>
      {/* <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData && (
        <div>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )} */}
      <Card
        day={"Monday"}
        weatherIcon={""}
        high={22}
        low={25}
        isSelected={selectedCardIndex === 0}
        onClick={() => handleCardClick(0)}
      />
      <Card
        day={"Tuesday"}
        weatherIcon={""}
        high={20}
        low={23}
        isSelected={selectedCardIndex === 1}
        onClick={() => handleCardClick(1)}
      />
      <Card
        day={"Tuesday"}
        weatherIcon={""}
        high={20}
        low={23}
        isSelected={selectedCardIndex === 2}
        onClick={() => handleCardClick(2)}
      />
      <Card
        day={"Tuesday"}
        weatherIcon={""}
        high={20}
        low={23}
        isSelected={selectedCardIndex === 3}
        onClick={() => handleCardClick(3)}
      />
    </div>
  );
};

export default WeatherApp;
