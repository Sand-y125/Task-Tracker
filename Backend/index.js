//We will not use this file anymore, we will use the index.js file to create our rest api//

const http = require('http');
let Task = [
    {
        id: 1,
        name: 'install node js',
        prioprity : 'high',
        completed : false

    }
]

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if(req.method === 'GET' && req.url === '/') {
         res.statusCode = 200;
        res.end('This is my first rest api....');
    }

    if(req.method=== 'GET' && req.url === '/task') {
        res.statusCode = 200;
        res.end(JSON.stringify(Task));

    }
    else if(req.method === 'POST' && req.url === '/task') {

    }

});



server.listen(5000, '127.0.0.1',() => {
  console.log('Server is running on port 5000');
});

