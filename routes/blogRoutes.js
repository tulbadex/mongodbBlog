const express = require('express');
const blogController = require('../controllers/blogController');


const router = express.Router();

router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

/* router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    //console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then((data) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
        .then((data) => {
            res.render('details', { blog: data, title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.json({ redirect: '/blogs'});
        })
        .catch((err) => { console.log(err) });
}); */

module.exports = router;