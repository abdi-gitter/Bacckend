const router = require('express').Router();
// the express router is a mini express application 
// without all the bells and whistles of an express application.
// Simply put, it's a way to group routes together.

// typically with routers, we will be using controllers to handle the logic of our routes.
// controllers are usually stored in a separate file.
// They are usually also either functions or methods on an object.
// import my controller:
const userController = require('../controllers/userController');

// We can also use middleware with our routers, and have pieces of middleware that
// are specific to certain routes.
const middleware = require('../middleware/middlewareExample');

// we can use the router object to define routes.
router.route('/') // 'server/users/'
    .get(middleware, userController.listUsers)
    .post(userController.checkUser)
    .put()
    .delete()

    // url parameters are used to pass data to the server.
router.route('/:name') // 'IP:port/users/abdisa'
// 'name' becomes a parameter that we can access in our controller.
// to access the value passed in as name, we reference:
// req.params.name = abdisa
    .get(userController.checkByParam)

// request.params are different from query parameters.
// query parameters are included in the URL.
//  http://localhost:8000/users?name=chase
// They are accessed like: req.query.name = chase


// to use this router in our main application, we need to export it.
module.exports = router;