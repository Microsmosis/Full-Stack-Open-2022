import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Filter = ({ value, fn }) => {
	return (
		<>
			find countries with <input value={value} onChange={fn} />
		</>
	);
};

const Languages = ({ langs }) => {
	let arr = [];
	let i = 0;
	for (let property in langs[0].languages) {
		arr[i++] = langs[0].languages[property];
	}

	const langArray = arr.map((lang) => <li key={lang}>{lang}</li>);

	return (
		<>
			<ul>{langArray}</ul>
		</>
	);
};

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

const Country = ({ fullData, weather }) => {
	return (
		<>
			<h1>{fullData[0].name.common}</h1>
			<p>capital {fullData[0].capital}</p>
			<p>area {fullData[0].area}</p>
			<h2>languages:</h2>
			<Languages langs={fullData} />
			<img alt={fullData[0].name.common} src={fullData[0].flags.png}></img>
			<Weather weather={weather} />
		</>
	);
};

const Countries = ({ allCountriesData, test, weather }) => {
	if (allCountriesData.length === 1) {
		return (
			<>
				<Country fullData={allCountriesData} weather={weather} />
			</>
		);
	}

	return (
		<>
			{allCountriesData.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : (
				<>{test} </>
			)}
		</>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [showCountries, setShowCountries] = useState('');
	const [weather, setWeather] = useState([]);
	const [switchW, setSwitchW] = useState([0]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
			setSwitchW(1);
		});
	}, [showCountries]);

	let searchValue = showCountries.toLowerCase();

	const countriesToShow = countries.filter((country) =>
		country.name.common.toLowerCase().includes(searchValue)
	);

	const handleShowCountry = (event) => {
		setShowCountries(event.target.value);
	};

	const handleShowCountryClick = (event) => {
		setShowCountries(event);
	};

	let capitalCity = '';
	if (switchW === 1) {
		capitalCity = countriesToShow[0].capital;
	}

	useEffect(() => {
		if (switchW === 1) {
			axios
				.get(
					'https://api.openweathermap.org/data/2.5/weather?q=' +
						capitalCity +
						'&appid=' +
						process.env.REACT_APP_API_KEY +
						'&units=metric'
				)
				.then((response) => {
					setWeather(response.data);
					setSwitchW(0);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [capitalCity, switchW]);

	const iteratedObject = countriesToShow.map((country) => (
		<p key={country.name.common}>
			{country.name.common}{' '}
			<button onClick={() => handleShowCountryClick(country.name.common)}>
				show
			</button>
		</p>
	));

	return (
		<>
			<Filter value={showCountries} fn={handleShowCountry} />
			<Countries
				allCountriesData={countriesToShow}
				test={iteratedObject}
				weather={weather}
			/>
		</>
	);
};

export default App;
