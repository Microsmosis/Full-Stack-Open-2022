const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('a blog can be added to db', async () => {
	const newBlog = {
		title: 'Slippy Slides',
		author: 'Star Fox',
		url: 'dunno.com',
		likes: 123,
	};

	const initialResponse = await api.get('/api/blogs');

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const response = await api.get('/api/blogs');
	const contents = response.body.map((r) => r.title);

	expect(response.body).toHaveLength(initialResponse.body.length + 1);
	expect(contents).toContain('Slippy Slides');
});

afterAll(() => {
	mongoose.connection.close();
});
