"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// Once we make the model, bring it in.
const Department = require('../models/department.model')

module.exports = {
    // findSearchSortPage gave us access to a new method on the res object!
    // this can be used to pass a model and get a list of entries for that model in the DB
    list: async (req, res)=>{
        const data = await res.getModelList(Department)
        // now we have an array of departments (data)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Department),
            data
        })
    },

    create: async (req, res)=>{
        const data = await Department.create(req.body)
        // all we need is a name for a department

        // if there is an error, it will be caught by the error handler
        res.status(201).send({
            error: false,
            body: req.body,
            data
        })
    },

    read: async (req, res)=>{
        // 'departments/183679127390817'
        // req.params.id = 183679127390817
        const data = await Department.findOne({_id: req.params.id})
        // if there's an error, our error handler handles it

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res)=>{
        // To update, we need to pass 3 arguments to the update method.
        // the first is the 'find' object
        // the second is the object holding the properties and values we want to update to
        // the third is an options object.  in this case, we will run validators.
        const data = await Department.updateOne(
            {_id: req.params.id},
            req.body, 
            {runValidators: true}
        )
        res.status(202).send({
            error:false,
            data,
            new: await Department.findOne({_id:req.params.id})
        })
    },

    delete: async (req, res)=>{
        const data = await Department.deleteOne({_id:req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}