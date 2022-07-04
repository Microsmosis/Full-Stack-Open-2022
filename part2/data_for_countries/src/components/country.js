import React from 'react';
import Languages from './languages.js'
import Weather from './weather.js'

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

export default Country