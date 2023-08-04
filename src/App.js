import React, { useState } from "react";
import Card from "./components/Card";
import BarChart from "./components/BarChart";
import "../src/Card.css";
import { IoSearch } from "react-icons/io5";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const API_KEY = "18f2ba39d8b76ccbd01e5a800a9d5d07";

const WeatherApp = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("city");
  const [metric, setMetric] = useState("metric");
  const [degree, setDegree] = useState("C");
  const [pollutionData, setPollutionData] = useState(null);
  const cardIndices = [0, 1, 2, 3, 4];

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

    fetch(apiUrl)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (selectedOption == "city") {
          getAdditionalData(data.coord.lat, data.coord.lon);
          getPollutionData(data.coord.lat, data.coord.lon);
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

  const getPollutionData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=52.2297&lon=21.0122&start=1606223802&end=1606269600&appid=18f2ba39d8b76ccbd01e5a800a9d5d07`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        setPollutionData(res.list[0].components);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setPollutionData(null);
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
        return response.json();
      })
      .then((data) => {
        parseWeatherData(data);
      })
      .catch((error) => {
        setWeatherData(null);
        alert(
          "An error occurred while fetching weather data. Please try again later."
        );
      });
  };

  function toggleMetric() {
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
      const weather = weatherList[i];
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
    setWeatherData(weatherData2);
    setCity(city2);
    setCountry(country2);

    return { city2, weatherData2 };
  };

  return (
    <div>
      <div className="topp">
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
            {cardIndices.map((index) => (
              <Card
                key={index}
                day={weatherData[index].date}
                weatherIcon={weatherData[index].weatherIcon}
                high={weatherData[index].maxTemperature}
                low={weatherData[index].minTemperature}
                isSelected={selectedCardIndex === index}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>
      )}
      <div>
        {pollutionData === [] ? (
          <div></div>
        ) : (
          <BarChart data2={pollutionData} />
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
