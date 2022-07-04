import React from 'react';
import Country from './country.js'

const Countries = ({ allCountriesData, jsxObject, weather }) => {
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
				<>{jsxObject} </>
			)}
		</>
	);
};

export default Countries