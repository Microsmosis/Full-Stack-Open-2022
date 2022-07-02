import React from 'react';

const Persons = ({ contacts , fn}) => {

	const iteratedObject = contacts.map((contact) => (
		<p key={contact.id}>
			{contact.name} {contact.number} {<button onClick={() => fn(contact)}>Delete</button>}
		</p>

	));
	return <>{iteratedObject}</>;
};

export default Persons;
