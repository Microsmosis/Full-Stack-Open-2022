import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Filter = ({ value, fn }) => {
	return (
		<div>
			find countries with <input value={value} onChange={fn} />
		</div>
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
		<div>
			<ul>{langArray}</ul>
		</div>
	);
};

const Country = ({ fullData }) => {
	return (
		<div>
			<h1>{fullData[0].name.common}</h1>
			<p>capital {fullData[0].capital}</p>
			<p>area {fullData[0].area}</p>
			<b>languages:</b>
			<Languages langs={fullData} />

			<img alt={fullData[0].name.common} src={fullData[0].flags.png}></img>
		</div>
	);
};

const Countries = ({ allCountriesData, test }) => {
	if (allCountriesData.length === 1) {
		return (
			<div>
				<Country fullData={allCountriesData} />
			</div>
		);
	}

	return (
		<div>
			{allCountriesData.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : (
				<>{test} </>
			)}
		</div>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [showCountries, setShowCountries] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

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

	const iteratedObject = countriesToShow.map((country) => (
		<p key={country.name.common}>
			{country.name.common}{' '}
			<button onClick={() => handleShowCountryClick(country.name.common)}>
				show
			</button>
		</p>
	));

	return (
		<div>
			<Filter value={showCountries} fn={handleShowCountry} />
			<Countries allCountriesData={countriesToShow} test={iteratedObject} />
		</div>
	);
};

export default App;
