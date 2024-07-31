// The purpose of this file is to show examples of BUILT IN middleware available in Express.
// This just means middleware that we don't have to download or write ourselves.

const express = require('express')
const app = express()
const port = 3000

// Built in middleware

// Read json data from the body of a request.
app.use(express.json()) // this middleware parses the json and converts to a JS object
// Read text data from the body of a request.
app.use(express.text()) // this middleware parses the text and converts to a JS object
// Read urlencoded FORM data from the body of a request.
app.use(express.urlencoded({ extended: true })) // this middleware parses the urlencoded 
// data and converts to a JS object
// In simple terms, if we submit a form, this middleware will parse the form data and convert it 
// to a JS object.

// Static Files:
// This middleware is used to serve static files.
app.use('/img', express.static('./public/img')) //
// All this is doing is saying if anyone goes to the path /img
// It's going to serve assets from the public/img folder publicly.

app.get('/', (req, res)=>{
    console.log(req.body)
    res.send('Hello, please access the public folder to see images.\n Go to /img/ to see the images.')
})

// send a file as a response:
app.get('/file', (req, res)=>{
    // We have more response methods that just send.
    // I can use sendFile,
    // or download to send a file as a response.
    
    // res.sendFile(__dirname + '/public/img/dog.webp')
    res.download(__dirname + '/public/img/dog.webp')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})