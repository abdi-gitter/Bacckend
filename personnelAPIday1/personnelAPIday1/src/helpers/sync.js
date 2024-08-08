"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// SYCHRONIZATION:

module.exports = async function() {

    return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    // This line below will completely wipe the database!
    // await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */
    
    /* Department & Personnel */
    const Department = require('../models/department.model')
    const Personnel = require('../models/personnel.model')
    const departments = [
        "FullStack Department",
        "DevOps Department",
        "CyberSec Department",
    ]
    // departments.forEach(value => {
    //     // Department.create:
    //     Department.create({ name: value }).then((department) => {
    //         console.log('- Department Added.')
    //         // Personnel.create:
    //         for (let i in [...Array(10)]) {
    //             Personnel.create({
    //                 departmentId: department._id,
    //                 username: "test" + (value[0] + i),
    //                 password: "Password1!",
    //                 firstName: "firstName",
    //                 lastName: "lastName",
    //                 phone: "(123)456-7890",
    //                 email: "test" + (value[0] + i) + "@site.com",
    //                 title: "title",
    //                 salary: 2500,
    //                 description: "description",
    //                 isActive: true,
    //                 isAdmin: false,
    //                 isLead: false,
    //                 startedAt: "2023-10-15 13:14:15"
    //             })
    //         }
    //         console.log('- Personnels Added.')
    //     })
    // })

    // Personnel.create({
    //     departmentId: "66b28401ffadc6c94601d045",
    //     username: "Administrator",
    //     password: "Password1!",
    //     firstName: "firstName",
    //     lastName: "lastName",
    //     phone: "(123)456-7890",
    //     email: "administrator@site.com",
    //     title: "Administrator",
    //     salary: 2500,
    //     description: "Top level admin account",
    //     isActive: true,
    //     isAdmin: true,
    //     isLead: true,
    //     startedAt: "2023-10-15 13:14:15"
    // })
    /* Department & Personnel */
}