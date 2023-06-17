import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import Descriptions from './components/Descriptions';
import {useEffect, useState} from 'react';
import {getFormattedWeatherData} from './weatherService';

function App() {

  const [city, setCity] = useState('Fort Worth');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);

    // dynamic background
    const threshold = units === 'imperiaL' ? 68 : 20;
    if (data.temp <= threshold) setBg(coldBg);
    else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    
    const isFahrenheit = currentUnit === 'F';
    button.innerText = isFahrenheit ? '°C' : '°F';
    setUnits(isFahrenheit ? 'imperial' : 'metric');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };


  return (
    <div className='app' style={{backgroundImage: `url(${bg})`}}>
      <div className='overlay'>
        {weather && (
          <div className='container'>
            <div className='section section-inputs'>
              <input  onKeyDown={enterKeyPressed} type='text' name='city' placeholder='enter city'/>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>

          <div className='section section-temperature'>
            <div className='icon'>
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt='weatherIcon'/>
              <h3>{weather.description}</h3>
            </div>
            <div className='temperature'>
              <h1>{`${weather.temp.toFixed()} °${units === 'imperial' ? 'F' : 'C'}`}</h1>
            </div>
          </div>

          {/* bottom description */}

          <Descriptions weather={weather} units={units} />
        </div>
          )
        }
        
      </div>
    </div>
  );
}

export default App;
