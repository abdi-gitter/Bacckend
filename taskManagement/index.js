const express = require('express')
const app = express()
const PORT = 3000
// colors:
require('colors')
// cors:
const cors = require('cors')
app.use(cors()) // This will allow us to make requests from any origin
// now we can use colors in our console.log statements
// this is as easy as: console.log('hello'.green)

// Middleware:
const logger = require('./middleware/logging')
app.use(logger)
// handle JSON data in the req.body:
app.use(express.json())

// Routes:
// default route:
app.get('/', (req, res) => {
    res.json('Welcome to the Task Master API, use /tasks to access tasks')
})
// tasks route:
// const tasksRouter = require('./routes/tasks')
// app.use('/tasks'), tasksRouter)
app.use('/tasks', require('./routes/tasks'))
// This router needs the following capabilities:
// GET /tasks return all tasks
// GET /tasks/:id return a single task
// POST /tasks create a new task
// PUT /tasks/:id update a task
// DELETE /tasks/:id delete a task

// Override page not found error:
// send back our own 404 response
app.use((req, res, next) => {
    try {
        throw new Error("Page not found!", { errCode: 404 });
    } catch (err) {
        next(err);
    }
});
// All this does is throw an error, catch it, and pass it to the next middleware function
// Which is the error handler middleware function!
// Remember if we pass the next function an argument, 
// it will assume it's an error and pass it to the error handler

// Error handling:
const errorHandler = require('./middleware/error')
app.use(errorHandler)
// Listen:
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})