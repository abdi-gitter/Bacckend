const router = require('express').Router();
// import the user controller
const {User} = require('../controllers/user.controller')

// '/users

router.route('/')
    .get(User.list)
    .post(User.create)

router.route('/:id')
    .get(User.read)
    .put(User.update)
    .patch(User.update)
    .delete(User.delete)

// if anyone tries to access a bad route, send a 404
router.all('*', (req, res)=>{
    res.status(404).send('Page not found')
})

module.exports = router;