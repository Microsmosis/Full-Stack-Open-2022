const Parts = ({ parts }) => {
	const iteratedObject = parts.map((element) => (
		<p key={element.id}>
			{element.name} {element.exercises}
		</p>
	));
	const total = parts.reduce((a, b) => ({
		exercises: a.exercises + b.exercises,
	}));
	return (
		<>
			{iteratedObject}
			<b>total of exercises {total.exercises}</b>
		</>
	);
};

const Content = ({ content }) => {
	return (
		<>
			<Parts parts={content.parts} />
		</>
	);
};

const Header = ({ course }) => {
	return (
		<>
			<h1>{course.name}</h1>
		</>
	);
};

const Course = ({ course }) => {
	return (
		<>
			<Header course={course} />
			<Content content={course} />
		</>
	);
};

export default Course;
