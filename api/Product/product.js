const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        let products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params);
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found'});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

})

router.get('/category/:category', async (req, res) => {
    try{
        console.log(req.params.category);
        let product = await Product.findOne({category: req.params.category});

        if(!product) {
            return res.status(404).json({ message: "Product not found"});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;