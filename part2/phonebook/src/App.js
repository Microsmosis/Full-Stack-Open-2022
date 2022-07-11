import React from 'react';
import Filter from './components/filter.js'
import Form from './components/form.js'
import Persons from './components/persons.js'
import Message from './components/message.js'
import contactService from './services/contacts'
import { useState, useEffect } from 'react'

const App = () => {

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [showPersons, setShowPersons] = useState('');
	const [messageName, setMessageName] = useState('');
	const [messageType, setMessageType] = useState('1');
	const [validErrorMsg, setValidErrorMsg] = useState('');
	useEffect(() => {
		contactService
		.getAll()
		.then(initialContacts => {
			setPersons(initialContacts)
		})
	}, [])

	let searchValue = showPersons.toLowerCase(showPersons);

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(searchValue)
	);

	const addPerson = (event) => {
		event.preventDefault();
		
		const personObject = {
			name: newName,
			number: newNumber,
		};
		const check = persons.find(p => p.name === personObject.name)

		if(check && check.name === personObject.name && window.confirm(check.name + ' is already addedd to the phonebook, replace the old with a new one?')) {
			contactService
				.update(check.id, personObject)
				.then(updatedContact => {
					setMessageName(personObject.name)
					setMessageType(2);
				})
				.catch (error => {
					setValidErrorMsg(error.response.data.error)
					setMessageType(3);
				})
			}
		else {
				contactService
				.create(personObject)
				.then(returnedContact => {
					setMessageName(personObject.name)
					setMessageType(1);
					setPersons(persons.concat(returnedContact))
				})
				.catch(error => {
					setValidErrorMsg(error.response.data.error)
					setMessageType(3);
				})
		}
		setNewName('')
		setNewNumber('')
	};

	const deletePerson =  (contact) => {
		if(window.confirm('Delete ' + contact.name + ' ?') === true) {
			contactService
				.del(contact.id)
				.then(returnedContact => {
					setPersons(
						persons.filter((person) => {
							return person.id !== contact.id;
						})
					 );
			})
		}
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
		<>
			<h2>Phonebook</h2>
			<Message name={messageName} type={messageType}  messageUpdateError={validErrorMsg}/>
			<Filter value={showPersons} fn={handleShowPerson} />
			<h2>add a new</h2>
			<Form fns={functions} valueName={newName} valueNumber={newNumber} />
			<h2>Numbers</h2>
			<Persons contacts={personsToShow} fn={deletePerson}/>
		</>
	);
};

export default App;
