"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// bring in the personnel Model:
const Personnel = require('../models/personnel.model')

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
        res.send({
            body: req.body,
            message: 'CREATE A PERSONNEL'
        })
    },

    read: async (req, res) => {
        res.send({
            message: 'READ SINGLE PERSONNEL'
        })
    },

    update: async (req, res) => {
        res.send({
            body: req.body,
            message: 'UPDATE PERSONNEL'
        })
    },

    delete: async (req, res) => {
        res.send({
            body: req.body,
            message: "DELETE PERSONNEL"
        })
    },

    login: async (req, res)=>{
        res.send({
            body: req.body,
            message: 'LOG IN'
        })
    },

    logout: async (req, res)=>{
        res.send({
            message: 'LOG OUT'
        })
    }
}