"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Access ENV variables:
require('dotenv').config()
const PORT = process.env?.PORT || 8001
// port 8000 would be from ENV file if working properly, otherwise, 8001

// because any asynchronous operation could cause an async error, we need to make sure
// we are passing async errors to our error handler BEFORE doing anything that might
// cause an async error!
require('express-async-errors')

// Connect to the DB:
const {dbConnection} = require('./src/configs/dbConnection')
dbConnection()

// MW:
// json in the req body?
app.use(express.json())
//req.body

// sessions? cookies?
// we can't do anything here until we have users.
app.use(require('cookie-session')({secret:process.env.SECRET_KEY}))

// login/logout control middelware
// This middleware will also set admin/lead
app.use(async (req, res, next)=>{
    // bring in personnel model so we can lookup user data from the cookie/session
    const Personnel = require('./src/models/personnel.model')

    if(req.session?.id){
        const user = await Personnel.findOne({ _id: req.session.id, password: req.session.password})
        // console.log("USERDATA FROM COOKIE")
        // console.log(user)
        req.user = user
        console.log(`isAdmin: ${req.user.isAdmin}`)
        console.log(`isLead: ${req.user.isLead}`)
    }
    next()
})

// our cool findSearchSortPage middleware?
app.use(require('./src/middlewares/findSearchSortPage'))
// This just adds 2 methods to the response object for future use in
// other middleware.

// auth control?
// nor can we do anything here until we have users

// ROUTES:

app.all('/', (req, res)=>{
    res.send({
        body: req.body || null,
        error: false,
        message: 'Welcome to the PERSONNEL API!',
        session: false,
        isLogin: false
    })
})

// departments
app.use('/departments', require('./src/routes/department.router'))

// personnel
app.use('/personnel', require('./src/routes/personnel.router'))

// continue from here...



/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
require('./src/helpers/sync')()