import React from 'react';

const Message = ({ name, type }) => {

	if(name === '') {
		return null;
	}
	
	const messageStyle = {
		color: 'green',
		fontSize: 20,
		backgroundColor: 'lightgray',
		width: '100%',
		height: 40,
		marginBottom: 25,
		border: '2px solid green',
	};

	const errorStyle = {
		color: 'red',
		fontSize: 20,
		backgroundColor: 'lightgray',
		width: '100%',
		height: 40,
		marginBottom: 25,
		border: '2px solid red',
	};

	const text = {
		color: 'green',
		fontSize: 20,
		marginTop : 8,
		marginLeft: 10
	}

	if(type === 3) {
		return (
			<div style={errorStyle}>
				<p>Information of {name} has already been deleted from the server</p>
			</div>
		);
	}

	if(type === 2) {
		return (
			<div style={messageStyle}>
				<p style={text}>Updated {name}</p>
			</div>
		);
	}

	return (
		<div style={messageStyle}>
			<p style={text}>Added {name}</p>
		</div>
	);
	
};

export default Message;