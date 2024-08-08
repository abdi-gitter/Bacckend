"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

// bring in our PWEncrypt function to only store encrypted passwords.
const pwEncrypt = require('../helpers/passwordEncrypt')
const Department = require('./department.model')

// make schema
const PersonnelSchema = new mongoose.Schema({
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        // used for foreign keys..
        ref: "Department",
        required: true,
        // make sure the department exists
        validate: {
            // This validator will check if the department exists in the database.
            validator: async (id) => {
                const exists = await Department.findById(id)
                return !!exists
                // !! converts to boolean
            },
            message: 'Department does not exist.'
        }
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                return passwordRegex.test(value);
            },
            message: 'Password must contain at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.'
        },
        // I'm going to encrypt the password with middleware to ENSURE
        // that we validate the password, then store only the encrypted
        // version of the password. (See middleware below.)
        // set: (pw)=> pwEncrypt(pw)
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        // validate that the phone number is a valid US phone number
        // Matching the format '(123)456-7890'
        // The first three digits must be enclosed in parentheses
        // The next three digits must be followed by a dash
        // The final four digits must not have a dash
        // https://www.w3resource.com/javascript/form/phone-number-validation.php
        validate: {
            validator: (phone) => /^\(\d{3}\)\d{3}-\d{4}$/.test(phone),
            message: 'Phone number must be in the format (123)456-7890'
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        // validate that the email is a valid email address
        validate: {
            validator: (email) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email)
            },
            message: 'Email must be a valid email address.'
        }
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    salary: {
        type: Number,
        default: 0,
        // validate that the salary is a positive number
        validate: {
            validator: (salary) => salary >= 0,
            message: 'Salary must be a positive number.'
        }
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isLead: {
        type: Boolean,
        default: false,
    },
    startedAt:{
        type: Date,
        default: Date.now()
    }
},{ collection: "personnel", timestamps: true })

// Pre-save middleware to encrypt the password
// this means that before saving, we check if the password has been modified
// which if we're creating new data, it will be, or if we're updating, it might be.
// if it has been modified, we re-encrypt it, then save it.
PersonnelSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = pwEncrypt(this.password);
    }
    next();
});

// export our model
module.exports = mongoose.model('Personnel', PersonnelSchema)


// example json data to create a personnel:
// {
//     "departmentId": "60c9f8d8f1f0f40015e6a4a6",
//     "username": "admin",
//     "password": "Admin123!",
//     "firstName": "Admin",
//     "lastName": "Admin",
//     "phone": "(123)456-7890",
//     "email": "emailsomething@something.com",
//     "title": "Admin",
//     "salary": 0,
//     "description": "This is the admin account.",
//     "isActive": true,
//     "isAdmin": true,
//     "isLead": true
// }