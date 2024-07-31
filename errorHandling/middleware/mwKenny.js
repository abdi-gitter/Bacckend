const mwKenny =(req,res,next)=>{
    console.log("Kenny middleware")
    next()
}


module.exports = mwKenny;

