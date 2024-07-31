// remember middleware is a function that has 3 parameters: req, res, next
const chasesMW = (req, res, next)=>{
    console.log("Hello from Chase's middleware!!!")
    next()
}

module.exports = chasesMW;