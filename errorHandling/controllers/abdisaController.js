// Controllers are either objects or functions that are exported from a module.
// Their job is to work as request handlers for our routes.

// In this case, since my route is so simple that it just responds to a get
// request, I can just export a single function that sends a response.
const abdisaController = (req, res)=>{
    res.send("Hello from Abdisa!")
}

// If things were more complex, and I needed multiple functions to handle
// different request method types, I would export an object with the functions as methods.

module.exports = abdisaController;