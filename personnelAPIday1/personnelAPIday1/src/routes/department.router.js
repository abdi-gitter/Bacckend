"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()

// bring in department controller:
const department = require('../controllers/department.controller')

/* ------------------------------------------------------- */
// '/departments'
router.route('/')
    .get(department.list)
    .post(department.create)

router.route('/:id')
    .get(department.read)
    .put(department.update)
    .patch(department.update)
    .delete(department.delete)

// router.get('/:id/personnel', (list all personnel in a department))

/* ------------------------------------------------------- */
module.exports = router