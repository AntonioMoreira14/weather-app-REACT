import React from 'react';
import { useEffect, useState } from 'react';
import sunset from './icons/sunset.png'
import sunrise from './icons/sunrise.png'
import wind from './icons/wind.png'
import direction from './icons/direction.png'
import eye from './icons/eye.png'
import humidity from './icons/humidity.png'
import cloud from './icons/cloud.png'

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
    <div>
      <section className='current-day'>
        <input
          type="text"
          onChange={handleEvent}
          value={inputLocal}
        />
        <button onClick={handleFetch}><i className='fa-solid fa-plane'></i></button>
        <div className='place-info'>
          <h2>{localInfo.name}</h2>
          <h2>{localInfo.country}</h2> 
        </div>
        <img src={localInfo.conditionIcon} alt= "" className="icon"/>
        <h2 className='current-temperature'>{Math.round(localInfo?.currentTemp)} <span className='celsius'>°C</span></h2>
        <br/><br/>
        <h2>{localInfo.condition}</h2>
        <br/><br/>
        <h2>{newDayWeek()}</h2>
        <h2>{localInfo.currentDate}</h2>
      </section>
      <section className='future-info'>
          <h2 className='tomorrow-day'>Tomorrow</h2>
          <img src={localInfo.futureIcon} className="icon-2" alt=""/>
          <h2 className='future-condition'>{localInfo.futureCondition}</h2>
          <br/>
          <h2 className='future-temp'>{localInfo?.futureMaxTemp} / {localInfo?.futureMinTemp}</h2>
          <h2></h2>
          <h2 className='future-humidity'><i className="fa-solid fa-droplet"></i> {localInfo?.averageHumidity}</h2>
          <h2 className='future-rain-chance'><i className="fa-solid fa-cloud-rain"></i> {localInfo?.futureChanceRain}</h2>
      </section>
          <h1 className='more-info-title'>More information from today:</h1>
      <section className="more-info">
        <div className='grid-info'>
          <h2 className='grid-title'>UV Index</h2>
          <h3 className='grid-value'><i className='fa-solid fa-sun'></i> {localInfo.uvRays}</h3>
        </div>
        <div className='grid-info'>
          <h2 className='grid-title'>Sunrise / Sunset</h2>
          <h3 className='grid-value'><img src={sunrise} className="outside-icons"/> {localInfo.sunrise}</h3>
          <h3 className='grid-value'><img src={sunset} className="outside-icons"/> {localInfo.sunset}</h3>
        </div>
        <div className='grid-info'>
          <h2 className='grid-title'>Wind Speed / Dir.</h2>
          <h3 className='grid-value'><img src={wind} className="outside-icons"/> {localInfo.windSpeed} kph</h3>
          <h3 className='grid-value'><img src={direction} className="outside-icons"/> {localInfo.windDirection}</h3>
        </div>
        <div className='grid-info'>
          <h2 className='grid-title'>Visibility</h2>
          <h3 className='grid-value'><img src={eye} className="outside-icons"/> {localInfo.visibility} km</h3>
        </div>
        <div className='grid-info'>
          <h2 className='grid-title'>Humidity</h2>
          <h3 className='grid-value'><img src={humidity} className="outside-icons"/> {localInfo.humidity} %</h3>
        </div>
        <div className='grid-info'>
          <h2 className='grid-title'>Cloud Coverage</h2>
          <h3 className='grid-value'><img src={cloud} className="outside-icons"/> {localInfo.cloud} %</h3>
        </div>
      </section>
    </div>
  );
}

export default App;
