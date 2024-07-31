const tasksRouter = require('express').Router()
// Now I have a new router object that I can use to define routes

// middleware for reqParams:
const hasId = require('../middleware/reqParamsCheck/reqParams')

// middleware for auth:
const auth = require('../middleware/auth/authMiddleware')

// IMPORT CONTROLLER FUNCTIONS:
const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasksController')

// we have 2 different paths (endpoints) that we need to define - '/' and '/:id'
// We know that if the URL is /task, we will be using this router

// one is /tasks
tasksRouter.route('/')
    .get(auth, getTasks)
    .post(auth, createTask)

// the other is /tasks/:id
tasksRouter.route('/:id')
// use middleware to make sure the ID is a number, and use the middleware on any request coming in to this route:
// the way we're going to get the ID for the task is in the request object in the params object
// req.params.id

// The goal of this hasID middleware is to make sure the ID is a number,
// THEN we call next, which is our actual controller/route handler
    .get(auth, hasId, getTask)
    .put(auth, hasId, updateTask)
    .delete(auth, hasId, deleteTask)

module.exports = tasksRouter