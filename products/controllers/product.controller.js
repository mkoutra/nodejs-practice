const Product = require('../models/product.model');

exports.findAll = async(req, res) => {
    console.log('Find all products.');
    try {
        const result = await Product.find({});
        res.json({status: true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}

exports.findOne = async(req, res) => {
    const id = req.params.id;
    console.log("Product id: " + id + " was asked.");

    try {
        const result = await Product.find({"_id": id});
        res.json({status: true, data: result});
    } catch (err) {
        res.json({status:false, data: err});
    }
}

exports.create = async(req, res) => {
    const body = req.body;
    console.log("Insert new product.");

    const newProduct = Product({
        "product": body.product,
        "cost": body.cost,
        "description": body.description,
        "quantity": body.quantity
    });

    try {
        const result = await newProduct.save();
        res.json({status: true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}

exports.update = async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log("Update product with id: " + id);
    
    const updateProduct = {
        "product": body.product,
        "cost": body.cost,
        "description": body.description,
        "quantity": body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate(
            {"_id": id},
            updateProduct
        );
        res.json({status: true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}

exports.delete = async(req, res) => {
    const id = req.params.id;
    console.log("Delete product with id: " + id);

    try {
        const result = await Product.findOneAndDelete({"_id": id});
        res.json({status: true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}