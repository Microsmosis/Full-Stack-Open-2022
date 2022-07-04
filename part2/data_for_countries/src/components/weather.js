import React from 'react';

const Weather = ({ weather }) => {
	const iconSource =
		'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
	return (
		<>
			<h1>Weather in {weather.name}</h1>
			<p>temperature {weather.main.temp} Celcius</p>
			<img src={iconSource} alt="icon"></img>
			<p>wind {weather.wind.speed} m/s</p>
		</>
	);
};

export default Weather