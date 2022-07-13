Blog = require('../models/blog')

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

	return blogs.reduce(reducer, 0); 
}

const favoriteBlog = (blogs) => {
	return  blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, 0)
}

let getBlogs = () => {
	return Blog.find({}).then((blogs) => {
	  return blogs;
	});
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	getBlogs
};
