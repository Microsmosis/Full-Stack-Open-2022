import React from 'react';

const Filter = ({ value, fn }) => {
	return (
		<div>
			filter shown with <input value={value} onChange={fn} />
		</div>
	);
};

export default Filter