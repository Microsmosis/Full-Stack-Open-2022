import React from 'react';
import axios from 'axios';
import Filter from './components/filter.js'
import Form from './components/form.js'
import Persons from './components/persons.js'
import { useState, useEffect } from 'react'

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [showPersons, setShowPersons] = useState('');

	useEffect(() => {
		axios
		  .get('http://localhost:3001/persons')
		  .then(response => {
			setPersons(response.data)
		  })
	  }, [])

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
