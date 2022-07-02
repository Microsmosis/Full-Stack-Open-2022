import React from 'react';

const Filter = ({ value, fn }) => {
	return (
		<>
			filter shown with <input value={value} onChange={fn} />
		</>
	);
};

export default Filter