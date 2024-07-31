const express = require('express')
const app = express()
require('dotenv').config()

// URL (path) options:
app.route('/') // this is the root path
    .get((req, res) => res.send('<h1>Hello World</h1>'))
    .post()
    .put()
    .delete()

app.get('/path', (req, res) => res.send("in 'path'")) // '/path' == '/path/'

//? express-urls supported JokerChar:
app.get('/abc(x?)123', (req, res) => res.send("in 'abc(x?)123'")) // abc123 or abcx123
app.get('/abc(z+)123', (req, res) => res.send("in 'abc(z+)123'")) // abcz123 or abczz..zz123
app.get('/abc*123', (req, res) => res.send("in 'abc*123'")) // abc123 or abc...123 // abc(ANY)123

//? express-urls supported regexp:
app.get(/xyz/, (req, res) => res.send("regexp /xyz/")) // url contains = 'xyz' (no limit for subPaths)
app.get(/^\/xyz/, (req, res) => res.send("regexp /^\/xyz/")) // url startswith = 'xyz'
app.get(/xyz$/, (req, res) => res.send("regexp /xyz$/")) // url endswith = 'xyz'

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.route('/users')
    .get((req, res) => res.send('All users'))
    .post((req, res) => res.send('Create user'))

// Getting a property out of the URL:
app.get('/users/:id', (req, res) => {
    // localhost:3000/users/1
    console.log(req.params) // { id: '1' }
    res.send(`User ${req.params.id}`) // User 1
})
