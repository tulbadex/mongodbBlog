// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
        .then((data) => {
            res.render('blogs/details', { blog: data, title: 'Blog Details'});
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a New Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((data) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.json({ redirect: '/blogs'});
        })
        .catch((err) => { console.log(err) });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}