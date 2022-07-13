const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const listHelper = require('../utils/list_helper');

const api = supertest(app);

test("updating blog", async () => {
	let blogsInDb = await listHelper.getBlogs();
	let blogToUpdate = blogsInDb[0];

	await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 41 });

	const response = await api.get("/api/blogs");
	const contents = response.body;

	expect(200);
	expect(contents[0].likes).toEqual(41);
});


afterAll(() => {
	mongoose.connection.close();
});
