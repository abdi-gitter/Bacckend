const authMiddleware = (req, res, next) =>{
    // to access the value for a header property
    const auth = req.get('auth') // this will get the value of the header property 'auth'
    // another way to access headers is to use req.headers
    // const auth = req.headers.auth
    if(auth === '123'){
        next()
    } else {
        const err = new Error('Not authorized')
        err.errCode = 401
        next(err)
    }
}

module.exports = authMiddleware;