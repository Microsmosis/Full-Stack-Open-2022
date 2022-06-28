import { useState } from 'react'

const Button = (props) => {
	const { fn, name } = props

	return (
		<>
			<button onClick={fn}>{name}</button>
		</>
	)
}

const Header = ({header}) => {
	return (
		<div>
			<h1>{header}</h1>
		</div>
	)
}

const StatisticLine = ({fb}) => {
	const iteratedObject = fb.grades.map(element => <tr key={element.id}><td>{element.name}</td><td>{element.value}</td></tr>)

	return (
		<>
			{iteratedObject}
		</>
	)
}

const Statistics = ({fb}) => {
	return (
		<div>
			<table>
				<tbody>
					{fb.grades[3].value ? <StatisticLine fb={fb}/> : <tr><td>No feedback given</td></tr>}
				</tbody>
			</table>
		</div>
	)
}

const App = () => {

	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const incrementGood = () => setGood(good + 1)
	const incrementNeutral = () => setNeutral(neutral + 1)
	const incrementBad = () => setBad(bad + 1)

	let all = good + neutral + bad

	const feedbacks = {
		grades: [
			{
				id: 1,
				name: 'good',
				value: good
			},
			{
				id: 2,
				name: 'neutral',
				value: neutral
			},
			{
				id: 3,
				name: 'bad',
				value: bad
			},
			{
				id: 4,
				name: 'all',
				value: all
			},
			{
				id: 5,
				name: 'average',
				value: (good - bad) / all
			},
			{
				id: 6,
				name: 'positive',
				value: (good / all) * 100 + ' %'
			}
		]
	}

	return (
		<div>
			<Header header={'give feedback'}/>
			<Button name={'good'} fn={incrementGood}/>
			<Button name={'neutral'} fn={incrementNeutral}/>
			<Button name={'bad'} fn={incrementBad}/>
			<Header header={'statistics'}/>
			<Statistics fb={feedbacks}/>
		</div>
	)
}

export default App