import React from 'react';
import { useEffect, useState } from 'react';
import sunset from './icons/sunset.png'
import sunrise from './icons/sunrise.png'
import wind from './icons/wind.png'
import direction from './icons/direction.png'
import eye from './icons/eye.png'
import humidity from './icons/humidity.png'
import cloud from './icons/cloud.png'
import sun from './icons/sun.png'

function App() {
  const [inputLocal, setInputLocal] = useState("Porto, Portugal")
  const [localInfo, setLocalInfo] = useState({})

  useEffect(() => {
    handleFetch();
  }, [])

  // Fetch info
  function handleFetch() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=6625485ddc2d44a9a9d145924221205&q=´${inputLocal}´&days=2&aqi=no&alerts=no`)
      .then(res => res.json())
      .then(data => setLocalInfo({
        name: data.location.name,
        country: data.location.country,
        currentDate: data.location.localtime.slice(5),
        dayOfTheWeek: data.location.localtime.slice(0, 10),
        currentTemp: data.current.temp_c,
        condition: data.current.condition.text,
        conditionIcon: data.current.condition.icon,
        uvRays: data.current.uv,
        humidity: data.current.humidity,
        visibility: data.current.vis_km,
        windDirection: data.current.wind_dir,
        windSpeed: data.current.wind_kph,
        cloud: data.current.cloud,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
        futureCondition: data.forecast.forecastday.slice(1, 2).map(({day: {condition: {text}}}) => text),
        futureIcon: data.forecast.forecastday.slice(1, 2).map(({day: {condition: {icon}}}) => icon),
        futureMaxTemp: data.forecast.forecastday.slice(1, 2).map(({day: {maxtemp_c}}) => Math.round(maxtemp_c) + ' °C '),
        futureMinTemp: data.forecast.forecastday.slice(1, 2).map(({day: {mintemp_c}}) => Math.round(mintemp_c) + ' °C '),
        averageHumidity: data.forecast.forecastday.slice(1, 2).map(({day: {avghumidity}}) => Math.round(avghumidity) + ' % '),
        futureChanceRain: data.forecast.forecastday.slice(1,2).map(({day: {daily_chance_of_rain}}) => Math.round(daily_chance_of_rain) + ' % ')
      }))
  }

  // Transform Date
  const date = new Date(localInfo.dayOfTheWeek);
  const newDay = date.getDay();

  const newDayWeek = () => { 
    let day;
    switch (newDay) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          day = "Wrong Day";
          break;
    }
    return day;
  }

  // handle input
  function handleEvent(event) {
    setInputLocal(event.target.value)
  }

  return (
    <div className='weather-body'>
      <h3 
        className='weather-title'>Check the weather in your city!
      </h3>
      <section>
        <input
          type="text"
          onChange={handleEvent}
          value={inputLocal}
          className="city-input"
          />
          <button 
            onClick={handleFetch} 
            className="input-btn">
              <i className='fa-solid fa-plane'></i>
            </button>
      </section>
        <h2 className='current-day-title'>Today</h2>
        <div className='current-day'>
          <h3 className='local-today'>{localInfo.name}</h3>
          <br />
          <h3 className='local-today'>{localInfo.country}</h3>
          <br />
        <img src={localInfo.conditionIcon} alt= ""/>
        <h2 
          className='current-temperature'
        >
          {Math.round(localInfo?.currentTemp)} <span>°C</span>
        </h2>
          <h3>{localInfo.condition}</h3>
          <br />
          <h3>{newDayWeek()}</h3>
          <h3>{localInfo.currentDate}</h3>
        </div>
        <h2 className='tomorrow-day-title'>Tomorrow</h2>
        <div className='tomorrow-day'>
          <h2>{localInfo.futureCondition}</h2>
          <img src={localInfo.futureIcon} alt=""/>
          <br/>
          <h3 className='tomorrow-temp'>Max: {localInfo?.futureMaxTemp}</h3>
          <h3 className='tomorrow-temp'>Min: {localInfo?.futureMinTemp}</h3>
          <br />
          <h3><i className="fa-solid fa-droplet"></i> {localInfo?.averageHumidity}</h3>
          <h3><i className="fa-solid fa-cloud-rain"></i> {localInfo?.futureChanceRain}</h3>
        </div>
      <h2 className='more-info-title'>More today's info</h2>
      <section className='more-info'>
        <div>
          <h2>UV Index</h2>
          <h2 className='info-value'><img src={sun} className="outside-icons"/> {localInfo.uvRays}</h2>
        </div>
        <div>
          <h2>Sunrise / Sunset</h2>
          <h3 className='info-value'><img src={sunrise} className="outside-icons"/> {localInfo.sunrise}</h3>
          <h3 className='info-value'><img src={sunset} className="outside-icons"/> {localInfo.sunset}</h3>
        </div>
        <div>
          <h2>Wind Speed / Dir.</h2>
          <h3 className='info-value'><img src={wind} className="outside-icons"/> {localInfo.windSpeed} kph</h3>
          <h3 className='info-value'><img src={direction} className="outside-icons"/> {localInfo.windDirection}</h3>
        </div>
        <div>
          <h2>Visibility</h2>
          <h3 className='info-value'><img src={eye} className="outside-icons"/> {localInfo.visibility} km</h3>
        </div>
        <div>
          <h2>Humidity</h2>
          <h3 className='info-value'><img src={humidity} className="outside-icons"/> {localInfo.humidity} %</h3>
        </div>
        <div>
          <h2>Cloud Coverage</h2>
          <h3 className='info-value'><img src={cloud} className="outside-icons"/> {localInfo.cloud} %</h3>
        </div>
      </section>
    </div>
  );
}

export default App;
