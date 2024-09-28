const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let addressSchema = new Schema(
    {
        area: { type: String },
        road: { type: String }
    }, 
    {
        _id: false  // Don't create an id whenever you create a addressSchema.
    })

let phoneSchema = new Schema({
    type: {type: String},
    number: {type: String}
}, {_id: false})

// Here we want an id every time a productSchema is created.
let productSchema = new Schema({
    product: { type: String },
    cost: { type: Number },
    quantity: { type: Number, required:true},
    date: { type: Date, default: Date.now }
})

let userSchema = new Schema({
    // All of the following criteria should match in order to write to username
    username: {
        type: String,
        required: [true, 'Username is required field.'],    // message in case someone did not 
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required field.'],
        max: 100
    },
    name: {
        type: String,
        required: [true, 'Name is required field.'],
        max: 100
    },
    surname: {
        type: String,
        required: [true, "Surname is required field."],
        max: 100
    },
    email: {
        type: String,
        required: [true, "Email is required field."],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email address is not valid",
          ]
    },
    address: addressSchema,
    phone: {type: [phoneSchema], null: true},
    products: {type: [productSchema], null: true}
},
{
    collection: 'users',
    timestamps: true    // createdAt and updatedAt are set by Mongo automatically
});

// For the fields we have defined as `unique` (email, username)
// It checks before saving, if there are other documents with the same email or username
userSchema.plugin(uniqueValidator);

// Collection name User
// With name 'User' userSchema will be exported
module.exports = mongoose.model('User', userSchema);