// NODE JS SERVER EXAMPLE

// Built in modules!!!
const http = require('http');

// PORTS:
const PORT = 3000;

const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 24 },
    { name: 'Jake', age: 26 },
    { name: 'Jill', age: 27 },
    { name: 'Jack', age: 28 }
];

// Function to set CORS headers
// CORS stands for Cross Origin Resource Sharing
// It is a security feature implemented by browsers
// to prevent malicious websites from making requests to
// other websites
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers
}

const server = http.createServer((req, res) => {
    // Set CORS headers for every request
    setCORSHeaders(res);

    // Handle OPTIONS method for preflight requests
    // a preflight request is a CORS request that checks 
    // to see if the CORS request is allowed

    // with chrome, the browser will send an OPTIONS request initially
    // to check if the server allows the CORS request
    // if the server responds with the correct headers, the browser will
    // send the actual request
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // No content to send back
        res.end();
        return;
    }

    if (req.url === '/' && req.method === 'GET') {
        res.write(JSON.stringify(users));
    } else if (req.url === '/' && req.method === 'POST') {
        // Read the body of the request
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let newUser = JSON.parse(body);
            users.push(newUser);
            // res.write();
            console.log(users)
            res.end(JSON.stringify(users));
        });
    } else if (req.url === '/about') {
        res.write('<h1>About Us</h1>');
    } else {
        res.write('<h1>Page Not Found</h1>');
    }

    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});