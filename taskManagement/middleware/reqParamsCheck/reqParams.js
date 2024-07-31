// write a function that returns true if there is a req.param.id
const hasId = (req,res,next)=>{
    if(isNaN(req.params.id)){
        next(new Error("Please provide a valid numerical ID", {errCode: 400}))
        // If the ID is not a number, we will call next with an error
        // then our error handler will send a response.
    }
    // This means the ID was a number, we can now call our next middleware function
    // Which is our actual route handler/controller function
    next()
}

module.exports = hasId;