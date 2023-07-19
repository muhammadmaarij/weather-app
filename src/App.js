import React, { useState } from "react";
import Card from "./components/Card";

const API_KEY = "18f2ba39d8b76ccbd01e5a800a9d5d07";

const WeatherApp = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.coord.lat, data[0].lon);
        getAdditionalData(data[0].lat, data[0].lon);
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
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        //  setWeatherData(data);
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

  const parseWeatherData = (data) => {
    console.log("eee", data);
    const city2 = data.city.name;
    const weatherList = data.list;
    const weatherData2 = [];

    for (let i = 0; i < weatherList.length; i += 8) {
      //3h data so for diff of 24h +8 -> 3h*8=24h
      const weather = weatherList[i];
      console.log("dasdsddddd", weather.weather);
      const date = new Date(weather.dt_txt);
      const temperature = Math.round(weather.main.temp);
      console.log("dsdds", weather.main.temp_min);
      console.log(weather.main.temp_max);
      const minTemperature = Math.floor(weather.main.temp_min);
      const maxTemperature = Math.ceil(weather.main.temp_max);
      const weatherIcon = weather.weather.icon;
      const weather2 = weather.weather.main;
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

    return { city2, weatherData2 };
  };

  return (
    <div>
      <h1>Weather App</h1>
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
          <h2>Weather for {city}</h2>
          <p>Temperature: {weatherData[selectedCardIndex].temperature}°C</p>
          <p>Humidity: {weatherData[selectedCardIndex].humidity}%</p>
          <p>Wind Speed: {weatherData[selectedCardIndex].windSpeed} m/s</p>
          <div>
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
