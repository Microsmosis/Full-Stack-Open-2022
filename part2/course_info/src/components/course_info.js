const Parts = ({ parts }) => {
	const iteratedObject = parts.map((element) => (
		<p key={element.id}>
			{element.name} {element.exercises}
		</p>
	));
	return <>{iteratedObject}</>;
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
			<Content content={course} />
		</>
	);
};

const Course = ({ course }) => {
	return (
		<>
			<Header course={course} />
		</>
	);
};

export default Course;
