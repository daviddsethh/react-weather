const API_KEY = 'ef8549afd804d53bef81799f2f3afc89';
const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = 'imperial') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL).then((res) => res.json()).then((data) => data);

    const {weather, 
        main: {
        feels_like, 
        humidity, 
        pressure, 
        temp, 
        temp_max, 
        temp_min
    }, 
        wind: {speed},
        sys: {country},
        name,
    } = data;

    const {description, icon} = weather[0];

    return{
        feels_like, 
        humidity, 
        pressure, 
        temp, 
        temp_max, 
        temp_min, 
        speed, 
        country, 
        name, 
        description, 
        iconURL: makeIconURL(icon)
    };
};

export {getFormattedWeatherData};