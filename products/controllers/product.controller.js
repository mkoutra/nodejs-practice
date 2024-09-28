const Product = require('../models/product.model');

exports.findAllProducts = async(req, res) => {
    console.log('Find all products');
    try {
        const result = await Product.find({});
        res.json({status: true, data: result});
    } catch(err) {
        res.json({status: false, data: err});
    }
}

exports.findOneProduct = async(req, res) => {
    const id = req.params.id;
    console.log("Product id: " + id + " was asked");

    try {
        const result = await Product.find({"_id": id});
        res.json({status: true, data: result});
    } catch (err) {
        res.json({status:false, data: err});
    }
}