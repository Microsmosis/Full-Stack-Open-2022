import React from 'react';

const Form = ({ fns, valueName, valueNumber }) => {

	return (
		<form onSubmit={fns[0]}>
			<div>
				name: <input value={valueName} onChange={fns[1]} />
			</div>
			<div>
				number: <input value={valueNumber} onChange={fns[2]} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default Form;
