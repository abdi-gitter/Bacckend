const abdisaRouter = require('express').Router();
const abdisaController = require('../controllers/abdisaController');


abdisaRouter.route('/')
    .get(abdisaController)

module.exports = abdisaRouter;