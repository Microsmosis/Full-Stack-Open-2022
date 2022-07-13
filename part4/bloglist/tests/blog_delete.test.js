const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('the request has been deleted', async () => {
	const newBlog = {
		title: 'testForDelete',
		author: 'Bowser',
		url: 'testing.com',
	};
	await api.post('/api/blogs').send(newBlog);
	const response = await api.get('/api/blogs');
	const contents = response.body.map((r) => r.id);
	const initialLength = contents.length;
	await api.delete('/api/blogs/' + contents[contents.length - 1])
	const newResponse = await api.get('/api/blogs');
	const newContents = newResponse.body.map((r) => r.id);
	expect(initialLength - 1).toBe(newContents.length);
});

afterAll(() => {
	mongoose.connection.close();
});
