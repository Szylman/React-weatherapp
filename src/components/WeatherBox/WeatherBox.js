import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weather, setWeather] = useState ('')
  const [pending, setPending] = useState (false)
  const [error, setError] = useState (false)
  
  const handleCityChange = useCallback(city => {
    setPending(true)
    setError(false)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=33a85dccb2c2d2da63a0ccea5c7d094d&units=metric`)
        .then(res => {
          if(res.status === 200) {
            return res.json()
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            }
            setWeather (weatherData)
            setPending (false)
          });
          } else {
            setError (true)
          };
        });
  }, []);
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(pending===false && error===false && weather) && <WeatherSummary {...weather}/>}
      {(pending===true && error===false) && <Loader />}
      {error===true && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;