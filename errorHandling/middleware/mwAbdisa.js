const mwAbdisa = (req,res,next) =>{
    console.log('Middleware Abdisa')
    next()
}
module.exports = mwAbdisa; 