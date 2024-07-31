const http = require('http') // BUILT IN MODULE
// This means it's included with Node.js - no need to install it!!!
// BUT we still need to require it to use it

// Accessing ENV variables:
require('dotenv').config() // This reads the .env file and sets the environment variables
// to reference them, use process.env.VARIABLE_NAME

// The callback function passed to createServer is going to be the function
// that runs EVERY SINGLE TIME a request is made to the server!!!

// This callback function is going to have two parameters:
// 1. req - the request object
// 2. res - the response object
const server = http.createServer((req, res) => {
    // Log information about the request...
    console.log('Request made to the server!!!')
    // ip address of the client
    console.log('Client IP:', req.socket.remoteAddress)
    // operating system of the client:
    console.log('Client OS:', req.headers['user-agent'])
    // log name of computer running server:
    console.log('Server Hostname:', req.socket) // interesting...
    console.log('Request URL:', req.url)
    console.log('Request Method:', req.method)
    console.log('Headers: ', req.headers)


    // Ahmed Router:
    if (req.url === '/ahmed' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' }) // send a 200 (OK) status code and set the Content-Type to 'text/html'
        res.end('<h1>Hello Ahmed!</h1>')
        console.log("hello?")
    }
    else if(req.url === '/abdisa'){
        // send back some JSON:
        res.writeHead(200, { 'Content-Type': 'application/json' }) // send a 200 (OK) status code and set the Content-Type to 'application/json'
        res.end(JSON.stringify({ message: 'Hello Abdisa!' })) // send back some JSON
    }
    else if(req.url === '/kenny'){
        res.writeHead(200, { 'Content-Type' : 'text/plain'}) // send a 200 (OK) status code and set the Content-Type to 'text/plain'
        res.end('Hello Kenny!') // send back some text
    }

    // Body of the request is not logged because it's not available yet!
    // The body of the request is the data that is sent with the request
    // For example, when you submit a form, the form data is sent in the body of the request
    // The body is sent in chunks, so we need to listen for the 'data' event on the request object.
    // The 'data' event is going to fire every time a chunk of data is received
    // when the data is finished, the 'end' event is going to fire
    // DEALING WITH THE BODY:

    if (req.url === '/') {
        req.on('data', (chunk) => {
            console.log("-------------------CHUNK RECEIVED!!!!------------------- \n")
            console.log('Data received:', chunk.toString())
        })
        req.on('end', () => {
            console.log('Data finished')
        })

        // methods of the response object:
        // res.writeHead() - write the status code and headers to the response
        res.writeHead(200, {
            // more on content-types: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
            // we'll look into this later
            'Content-Type': 'text/html'
        })
        // The status code is a number that tells the browser if the request was successful or not
        // 200 - OK
        // 404 - Not Found
        // 500 - Internal Server Error
        // 400 - Bad Request
        // 201 - Created
        // 204 - No Content
        // ETC...

        // WHEN SENDING A RESPONSE:
        // we can send back JSON, text, HTML, etc...
        // If we want to send back JSON, we need to set the Content-Type header to 'application/json'
        // If we want to send back HTML, we need to set the Content-Type header to 'text/html'
        // If we want to just send back simple text, we can set the Content-Type header to 'text/plain'

        // The browser will automatically try to parse the response based on the Content-Type header
        // This is why it's so easy to send HTML, JSON, etc...

        // res.write() - write data to the response - can be called multiple times
        res.write('<h1>Hello World!</h1>')

        // res.end() - end the response - must be called once
        res.end()
    }
}) // This creates a server object

// In order to receive requests, we need to tell the server to listen on a port
// The port is like a door number to the server
// The callback function is going to run once when the server starts listening.
server.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT)
})