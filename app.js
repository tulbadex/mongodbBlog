const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
//const { render } = require('ejs');


// express app
const app = express();

// connect to mongoDb
// const dbURI = 'mongodb+srv://root:<password>@ascageblog.m5wxm.mongodb.net/<dbname>?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://root:root123@ascageblog.m5wxm.mongodb.net/ascage-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => app.listen(3000))
        .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
// middleware to accept form data
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// listen for requests
// app.listen(3000);

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Java',
        snippet: 'Java and its greatness',
        body: 'Java is a big and robust programming language first by sun'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    //res.render('index', { title: 'Home', blogs });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5f11b9cc8d7f9c472844dd85')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    //res.render('index', { title: 'Home', blogs });
});

app.get('/', (req, res) => {
    res.redirect('/blogs')
    /* const blogs = [
        {title: 'First Title', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
        {title: 'First Second', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
        {title: 'First Third', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    ];
    res.render('index', { title: 'Home', blogs }); */
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// blog route
app.use('/blogs', blogRoutes);

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});