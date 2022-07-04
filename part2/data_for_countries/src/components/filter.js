import React from 'react';

const Filter = ({ value, fn }) => {
	return (
		<>
			find countries with <input value={value} onChange={fn} />
		</>
	);
};

export default Filter