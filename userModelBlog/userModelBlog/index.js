const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT

// connect to the DB
require('./configs/dbConnection')

// async error handler
require('express-async-errors')

// parse JSON in body
app.use(express.json())

// Routes:
app.all('/', (req, res)=>{
    res.send('Welcome to the blog API.  Please use /blog or /users')
})

app.use('/blog', require('./routers/blog.router'))
app.use('/users', require('./routers/user.router'))


// Error handler:
app.use(require('./middleware/errorHandler'))

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})