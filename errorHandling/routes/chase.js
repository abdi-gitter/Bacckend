// To create a router,
// I need to require express.Router() and assign it to a variable.
// I can then use the router variable to create routes.

const chaseRouter = require('express').Router();
// This is like a mini express application.

// To use an external controller, I need to require it.
const chaseController = require('../controllers/chaseController');

// This will end up being /chase
chaseRouter.route('/')
    .get(chaseController)

module.exports = chaseRouter;