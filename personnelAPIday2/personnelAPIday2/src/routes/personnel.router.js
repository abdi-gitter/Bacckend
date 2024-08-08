"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()

// bring in personnel controller
const personnel = require('../controllers/personnel.controller')
/* ------------------------------------------------------- */

const isAdmin = (req, res, next)=>{
    if(req?.user?.isAdmin){
        next()
    } else {
        throw new Error("ACCESS DENIED.  USER IS NOT AN ADMIN...")
    }
}

const isLeadOrAdmin = (req, res, next)=>{
    if(req?.user?.isAdmin || req?.user?.isLead){
        next()
    } else {
        throw new Error("ACCESS DENIED. USER IS NOT ADMIN OR LEAD")
    }
}

router.post('/login', personnel.login)
router.all('/logout', personnel.logout)

router.route('/')
    .get(personnel.list)
    .post(isLeadOrAdmin, personnel.create)

router.route('/:id')
    .get(personnel.read)
    .put(isLeadOrAdmin, personnel.update)
    .patch(isLeadOrAdmin, personnel.update)
    .delete(isAdmin, personnel.delete)

/* ------------------------------------------------------- */
module.exports = router