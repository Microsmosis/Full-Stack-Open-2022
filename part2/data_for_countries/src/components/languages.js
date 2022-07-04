import React from 'react';

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

export default Languages