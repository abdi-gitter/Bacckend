"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// bring in the personnel Model:
const Personnel = require('../models/personnel.model')
// bring in password encrypt:
const pwEncrypt = require('../helpers/passwordEncrypt')

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Personnel)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Personnel),
            data
        })
    },

    create: async (req, res) => {
        req.body.isAdmin = false // never let anyone create a new admin account.
        // req.user.isAdmin if this is true, the current user is an admin, if false, they're not an admin.
        // if the current user is not an admin, set req.body.isLead to false.

        if(!req.user.isAdmin){
            // This means the currently logged user is NOT an admin
            req.body.isLead = false
            console.log("Team lead created user.")
        } else{
            console.log("Admin created user.")
        }
        const personnel = await Personnel.create(req.body)

        res.status(201).send({
            error:false,
            data: personnel
        })
    },

    read: async (req, res) => {
        const data = await Personnel.findById(req.params.id)

        res.status(200).send({
            error:false,
            data
        })
    },

    update: async (req, res) => {
        const data = await Personnel.findByIdAndUpdate(req.params.id, {...req.body})

        res.status(200).send({
            error: false,
            data
        })
    },

    delete: async (req, res) => {
        // deleteOne:

        // const data = await Personnel.deleteOne({_id: req.params.id})
        // console.log(data.deletedCount)

        // res.status(data.deletedCount? 204 : 404).send({
        //     error: !data.deletedCount,
        //     data
        // })

        // findByIdAndDelete:

        try {
            const doc = await Personnel.findByIdAndDelete(req.params.id);
            // This returns the document that was deleted (if there was one)
            
            if (doc) {
                // console.log(`Document deleted: ${doc}`);
                // here we're using a 200 code so we can actually see the response body
                // if we use a 204, there will be no body in the response as 204 means "no content"
                res.status(200).send({
                    error: false,
                    data: doc
                });
            } else {
                console.log(`No document found with id: ${req.params.id}`);
                res.status(404).send({
                    error: true,
                    message: `No document found with id: ${req.params.id}`
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({
                error: true,
                message: 'An error occurred'
            });
        }        
    },

    login: async (req, res) => {
        const { username, password } = req.body

        if (username && password) {
            // lookup the user by the username and password and make sure there's a match.
            const user = await Personnel.findOne({ username, password: pwEncrypt(password) })
            // console.log(user)
            // WE GOT A USER!
            // We're ready to create a session!
            // req.session - This property will be read by the cookie-session middleware.
            // remember this session data will automatically be sent by the cookie in every future request
            if (user) {
                req.session = {
                    id: user._id,
                    password: user.password
                }
                // set our cookie
                if (req.body?.rememberMe) {
                    const days = 3
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * days
                }
                // the cookie will automatically be sent in the response because of the cookie-session middleware.

                res.status(200).send({
                    error: false,
                    user
                })
            } else {
                res.errorStatusCode = 401
                throw new Error("Invalid credentials...")
            }
        } else {
            res.errorStatusCode = 401
            throw new Error("Please enter a username and a password...")
        }
    },

    logout: async (req, res) => {
        req.session = null
        res.status(200).send({
            error:false,
            message: 'Logout successful, session removed.'
        })
    }
}