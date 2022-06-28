import { useState } from 'react';

const UpdateVote = (allVotes, selected, setAllVotes) => {
	let tempArr = [...allVotes];
	tempArr[selected] += 1;
	setAllVotes(tempArr);
};

const Button = ({ fn, arr, index, name }) => {
	return (
		<div>
			<button onClick={() => UpdateVote(arr, index, fn)}>{name}</button>
		</div>
	);
};

const NextButton = ({ fn, name }) => {
	return (
		<div>
			<button onClick={fn}>{name}</button>
		</div>
	);
};

const Votes = ({ votes, index }) => {
	return (
		<>
			<p>has {votes[index]} votes</p>
		</>
	);
};

const Header = ({ text }) => {
	return (
		<>
			<h1>{text}</h1>
		</>
	);
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	];

	const [selected, setSelected] = useState(0);
	const [allVotes, setAllVotes] = useState(Array(7).fill(0));
	const incrementSelected = () => setSelected(Math.ceil(Math.random() * 6));
	console.log(selected)
	let mostVotes = 0;
	for (let i = 0, j = 0; i < 6; i++) {
		if (allVotes[i] > j) {
			mostVotes = i;
			j = allVotes[i];
		}
	}
	return (
		<div>
			<Header text={'Anecdote of the day'} />
			{anecdotes[selected]}
			<Votes votes={allVotes} index={selected} />
			<Button fn={setAllVotes} arr={allVotes} index={selected} name={'vote'} />
			<NextButton fn={incrementSelected} name={'next anecdote'} />
			<Header text={'Anecdote with the most votes'} />
			{anecdotes[mostVotes]}
			<Votes votes={allVotes} index={mostVotes} />
		</div>
	);
};

export default App;
