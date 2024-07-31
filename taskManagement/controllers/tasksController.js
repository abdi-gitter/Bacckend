const tasks = require('../data/data').tasks

// controller functions:
// aka request handlers

// get /tasks:
const getTasks = (req, res) => {
    // all this funciton is doing is sending back a json object
    // This json object has the following properties:
    res.json({
        success: true,
        data: tasks,
        count: tasks.length
    })
}

// post /tasks:
const createTask = (req, res, next) => {
    // the task data will be sent in the body of the request
    // req.body
    // req.body.title, req.body.description
    // When we add a task to the array of tasks, we also need to assign an ID.
    // {id, title, description} - Schema
    // Check to make sure we have a title and a description:
    if (!req.body.title || !req.body.description) {
        // next(new Error("Please provide a title and a description", { errCode: 400 }))
        const err = new Error("Please provide a title and a description")
        err.errCode = 400
        throw err
    }
    // We need to generate a random ID and make sure that ID is not in use.
    let isUnique = false
    // If we have over 1000 tasks, this will be an infinite loop. BE AWARE
    while (!isUnique) {
        let randomID = Math.floor(Math.random() * 1000)
        // check if this randomID is being used by any tasks
        let found = tasks.find(task => task.id === randomID)
        if (!found) {
            // if we didn't find a task with this randomID, then we can use it
            isUnique = true
            // create a new task object
            let newTask = {
                id: randomID,
                title: req.body.title,
                description: req.body.description
            }
            // At this point, we know we have a unique ID,
            // we can add the new task to the tasks array
            // and send back our response.
            // add the new task to the tasks array
            tasks.push(newTask)

            // send back the response
            res.json({
                success: true,
                data: newTask,
                count: tasks.length,
                message: `Task ${newTask.id} has been created`
            })
        }
        // The loop will continue until we find a unique ID
    }
}

// Now we need to be able to update, delete, and return a single task
// In order to do this we will use req.params.id, and use the task's ID
// To single out the specific task we want to work with.


// get /tasks/:id
const getTask = (req, res, next) => {
    // remember to reference the id of a task, the user of the API is already
    // going to be providing us the ID in the URL params.
    // we can access this value by using req.params.id
    // we'll parse this value to make sure it's a number like in the data file
    const id = parseInt(req.params.id)
    // Find the task object in the tasks array that has this ID:
    // if the ID is not found, the find method will return an error with a message explaining this.
    // we can use findIndex to get the index of the task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === id)
    console.log(taskIndex)
    if (taskIndex === -1) {
        // if the taskIndex is -1, the task was not found
        // next(new Error(`Task with ID ${id} not found`, { errCode: 404 })) - this will not work
        // because the error object in javascript does not accept a second argument for custom properties
        // instead:
        const err = new Error(`Task with ID ${id} not found`)
        err.errCode = 404
        // because we don't have a try/catch, we'll throw the error here
        throw err
    }
    // If I don't put the code below into an else statement, it will run even if the taskIndex is -1
    // This is because the if statement is only checking if the taskIndex is -1
    // calling next will not stop the function from running, it will just pass the error to the error handler
    else {
        // Now we know we have a taskIndex, which means we have the task object
        res.json({
            success: true,
            data: tasks[taskIndex]
        })
    }
}

// put /tasks/:id
const updateTask = (req, res, next) => {
    try {
        let id = parseInt(req.params.id)
        // get title and description from the body
        const { title, description } = req.body
        // find the task index in the tasks array
        let index = tasks.findIndex(task => task.id === id)
        if (index === -1) {
            // throw new Error(`No task with id ${id}`, { errCode: 404 })
            // The error object in javascript does not accept a second argument for
            // custom properties. We can add custom properties to the error object
            // by adding them directly to the error object
            // then we throw our error we created directly.
            const err = new Error(`Task with ID ${id} not found`)
            err.errCode = 404
            throw err
        } else {
            // update task object
            tasks[index].title = title ? title : tasks[index].title
            tasks[index].description = description ? description : tasks[index].description
            // send back response:
            res.json({
                success: true,
                data: tasks[index],
                message: `Task ${id} has been updated`
            })
        }
    } catch (err) {
        next(err)
    }
}
// delete /tasks/:id
const deleteTask = (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        // find the index of the task object in the tasks array
        const index = tasks.findIndex(task => task.id === id)
        if (index === -1) {
            const err = new Error(`Task with ID ${id} not found`)
            err.errCode = 404
            throw err
        } else {
            // remove the task object from the tasks array
            tasks.splice(index, 1)
            res.json({
                success: true,
                message: `Task with ID ${id} has been deleted`
            })
        }
    } catch (err) {
        next(err)
    }

}

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}