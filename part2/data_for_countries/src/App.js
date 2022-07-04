import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/filter.js'
import Countries from './components/countries.js'

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
		if(countriesToShow.length > 0)
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
				jsxObject={iteratedObject}
				weather={weather}
			/>
		</>
	);
};

export default App;
