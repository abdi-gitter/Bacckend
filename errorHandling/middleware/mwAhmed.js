const Ahmed =(req,res,next) => {
    console.log('middleware Ahmed')
    next()
}

module.exports = Ahmed;