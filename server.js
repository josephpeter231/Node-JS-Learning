const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    const num = _.random(5, 100);
    console.log(num);

    res.setHeader('Content-Type', 'text/html');
    const path = './views/';
    switch (req.url) {
        case '/about':
            path += 'about.html';
            break;
        case '/about-me':
            res.statusCode = 302;
            res.setHeader('Location', '/about');
            res.end();
            return; // Exit the switch
        case '/':
            path += 'index.html';
            break;
        case '/service':
            path += 'blogs.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
        } else {
            res.statusCode = 200; // OK status
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening');
});
