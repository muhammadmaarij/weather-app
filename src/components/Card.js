import React from "react";
import "../Card.css";

function Card({ day, weatherIcon, high, low, isSelected, onClick }) {
  const weatherIconStyle = {
    height: "200px",
    width: "140px",
    borderRadius: "10px",
    border: isSelected ? "2px solid #ccc" : "2px solid transparent",
    backgroundColor: isSelected ? "#EEEDED" : "white",
  };

  return (
    <div style={weatherIconStyle} onClick={onClick}>
      <div className="parent-div">
        <p className="day">{day}</p>
        <img
          className="image-temp"
          src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
          alt="Weather Icon"
        />
        <div className="row-temp">
          <p className="text-temp-low">{low}°</p>
          <p className="text-temp">{high}°</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
