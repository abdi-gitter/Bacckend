const express = require('express')
// this is the express module

// get the .env variables:
require('dotenv').config()

// TODO: COME BACK TO THIS:
// PARSE THE BODY OF THE REQUEST

// to create an express app:
const app = express() /// this function returns an object that represents the express app

// an app needs to listen on a port in order to receive requests
// and respond to them.

// These are our HTTP methods that we can use to interact with the server:
// GET, POST, PUT, DELETE, etc.
// If I say app.get(), I am telling the server to listen for GET requests.
// These methods take two arguments: a path(string) and a callback function.
// This callback function is also known as a request handler/controller function/middleware.
// These functions are going to take at least 2 arguments. REQ, RES
app.get('/', (req, res)=>{
    console.log("request received")
    res.send('<h1>Hello World</h1>')
    // res.send() is a method that sends a response to the client
    // This is the simplest way to send a response
    // This method can take a string, a buffer, an object, or an array
    // It will convert these into a string and send them to the client
    // This method also automatically sets the Content-Type header to text/html

    // If you want to send JSON, you can use res.json()
    // If you want to send a file, you can use res.sendFile()
    // If you want to send a status code, you can use res.sendStatus()
})
app.post('/', (req, res)=>{
    res.send('<h1>POST request received</h1>')
})
app.put('/', (req, res)=>{
    res.send('<h1>PUT request received</h1>')
})
app.delete('/', (req, res)=>{
    res.send('<h1>DELETE request received</h1>')
})

// instead of setting up every route individually, we can create a route:
// route is a method of the express app object.
// route takes a path as an argument and returns a route object.
// This route object has multiple methods that correspond to the HTTP methods.
app.route('/route')
    // These methods take a callback function as an argument
    // These callback functions are also known as request handlers
    // when making request handlers, we pass the request and response objects
    .get((req,res)=>{
        // The request object and the response object both have properties and methods
        // We can access various properties and methods depending on what we want to do
        
        // Let's log some basic info about the request:
        console.log(`Request URL: ${req.url}`) // url
        console.log(`Request Method: ${req.method}`) // method
        console.dir(req.headers) // headers
        console.dir(req.query) // query string, ex: ?name=John
        console.dir(req.params)// route parameters, ex: /users/:id
        console.log(`Request Body: ${req.body}`) // body of the request
        console.log(req.protocol) // http or https (whichever protocol is being used)
        console.log(req.originalUrl) // the original URL of the request

        // Response object also has properties and methods
        // Let's look at some of the methods of the response object:

        // res.status() - sets the status code of the response
            // This method returns the res objct again, so we can chain methods.
        // res.send() - sends a response to the client
        // res.send() - sends a response to the client
        // res.json() - sends a JSON response to the client
        // res.sendFile() - sends a file to the client
        // res.sendStatus() - sends a status code to the client
        // res.redirect() - redirects the client to another URL
        // res.render() - renders a view template
        // res.end() - ends the response process
        // res.download() - prompts the client to download a file
        // res.set() - sets the response header
        // res.get() - gets the response header
        // res.cookie() - sets a cookie - MORE ON COOKIES LATER!!!
        // res.clearCookie() - clears a cookie - MORE ON COOKIES LATER!!!
        // res.header() - sets the response header
        // res.type() - sets the Content-Type header
        // res.format() - sends different content types based on the Accept header
        // res.attachment() - sets the Content-Disposition header
        // res.append() - appends a value to a header
        // res.links() - sends links in the Link header
        // res.locals - an object that contains response local variables scoped to the request
        // res.location() - sets the response Location HTTP header
        // res.vary() - sets the Vary header

        res.status(200).send('<h1>Get request received</h1>')
        // some basic status codes:
        // 100 - informational, 200 range - success, 300 range - redirection, 400 range - client error, 500 range - server error

        // 200 - OK
        // 201 - Created
        // 204 - No Content
            // for updating a resource, we can use 200 or 204
        // 300 - Multiple Choices
        // 301 - Moved Permanently
        // 302 - Found(previously 'moved temporarily')
        // 303 - See Other
        // 400 - Bad Request
        // 401 - Unauthorized
        // 403 - Forbidden
        // 404 - Not Found
        // 405 - Method Not Allowed
        // 500 - Internal Server Error
        // 501 - Not Implemented
        // 502 - Bad Gateway
        // 503 - Service Unavailable
        // 504 - Gateway Timeout
    })
    .put((req,res)=>{res.send('<h1>Put request received</h1>')})
    .post((req,res)=>{res.send('<h1>Post request received</h1>')})
    .delete((req,res)=>{res.send('<h1>Delete request received</h1>')})

// the listen() method takes a port number and a callback function
// This callback function will be called once the server is running
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})