import React from 'react';

const Persons = ({ contacts }) => {
	const iteratedObject = contacts.map((contact) => (
		<p key={contact.name}>
			{contact.name} {contact.number}
		</p>
	));
	return <div>{iteratedObject}</div>;
};

export default Persons;
