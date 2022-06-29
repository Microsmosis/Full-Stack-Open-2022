import { useState } from 'react';

const Filter = ({ value, fn }) => {
	return (
		<div>
			filter shown with <input value={value} onChange={fn} />
		</div>
	);
};

const Form = ({fns, valueName, valueNumber}) => {
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
	)
}

const Persons = ({contacts}) => {
	const iteratedObject = contacts.map((contact) => (<p key={contact.name}>{contact.name} {contact.number}</p>))
	return (
		<div>
			{iteratedObject}
		</div>
	)
}


const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [showPersons, setShowPersons] = useState('');

	let searchValue = showPersons.toLowerCase(showPersons);
	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(searchValue)
	);

	const addPerson = (event) => {
		event.preventDefault();
		let nameList = persons.map((element) => {
			return element.name;
		});
		if (nameList.includes(newName)) {
			return alert(`${newName} is already added to phonebook`);
		}
		const personObject = {
			name: newName,
			number: newNumber,
		};
		setPersons(persons.concat(personObject));
		setNewName('');
	};

	const handleNewPerson = (event) => {
		setNewName(event.target.value);
	};

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleShowPerson = (event) => {
		setShowPersons(event.target.value);
	};

	const functions = [
		addPerson, handleNewPerson, handleNewNumber
	]

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={showPersons} fn={handleShowPerson} />
			<h2>add a new</h2>
			<Form fns={functions} valueName={newName} valueNumber={newNumber} />
			<h2>Numbers</h2>
			<Persons contacts={personsToShow} />
		</div>
	);
};

export default App;
