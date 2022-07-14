const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms '
	)
);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

module.exports = app;