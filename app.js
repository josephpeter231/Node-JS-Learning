const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog')

// Connect to MongoDB
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.shduihs.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        // Start the server after successfully connecting to the database
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Set the view engine to use EJS
app.set('view engine', 'ejs');


app.use(express.static('public'));



//for interactions with the database
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Joseph',
        snippet: 'Hey there how u doing its me', 
        body: 'same'
    });

    // Save the new blog to the database
    blog.save()
        .then(result => {
            console.log('Blog saved successfully:', result);
            res.send('Blog added successfully');
        })
        .catch(error => {
            console.error('Error saving blog:', error);
            res.send('Error adding blog');
        });
});

app.use((req, res, next) => {
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// Handle 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});
