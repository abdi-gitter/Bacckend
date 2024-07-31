// bring in user model:
const User = require('../models/user.model')

module.exports.User ={
    // GET all users
    list: async (req, res)=>{
        const data = await User.find()
        res.status(200).send({
            error: false,
            data: data
        })
    },
    // POST a new user
    create: async (req, res)=>{
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
            data: data
        })
    },

    // methods for single users:
    // GET a single user
    read: async (req, res)=>{
        const {id} = req.params
        const data = await User.findOne({_id: id})
        res.status(200).send({
            error: false,
            data: data
        })
    },
    // PUT PATCH update a user
    update: async (req, res)=>{
        const {id} = req.params
        // data
        const data = await User.updateOne({_id: id}, req.body)
        // newData
        const newData = await User.find({_id: id})
        res.status(202).send({
            error: false,
            body: req.body,
            data,
            newData
        })
    },
    // DELETE a user
    delete: async (req, res)=>{
        const data = await User.deleteOne({_id: req.params.id})
        res.sendStatus((data.deletedCount >= 1)? 204 : 404)
    }

}