const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('likes property defaults to 0 if not defined', async () => {
	const newBlog = {
		title: 'Where is Wario',
		author: 'Luigi',
		url: 'stupidness.com',
	};

	await api.post('/api/blogs').send(newBlog).expect(201);

	const response = await api.get('/api/blogs');
	const contents = response.body.map((r) => r.likes);
	
	expect(contents[contents.length - 1]).toBe(0);
});

afterAll(() => {
	mongoose.connection.close();
});