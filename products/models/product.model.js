const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, "Product is a required field."],
        max: 100,
        unique: true,
        trim: true
    },
    cost: {
        type: Number,
        required: [true, "Cost is a required field."]
    },
    description: {
        type: String,
        max: 255,
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is a required field."]
    }
},
{
    collection: 'products',
    timestamps: true
})

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);