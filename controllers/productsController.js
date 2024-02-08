const productModel = require("../models/productModel")

const createProduct = async (req, res) => {
    const { product, category, price } = req.body

    const isEmpty = !product || !category || !price

    if (isEmpty) res.status(400)

    try {
        let product = new productModel(req.body)

        await product.save()
        res.status(201).send(product)
    } catch (e) {
        console.log("error", e)
        res.status(500)
    }
}

const getProducts = async (req, res) => {
    try {
        let products = await productModel.find()

        res.json(products)
    } catch (e) {
        console.log("error", e)
        res.status(500)
    }
}

const updateProduct = async (req, res) => {
    const { product, category, price } = req.body
    const productid = req.params.id

    const isEmpty = !product || !category || !price
    if(isEmpty) res.status(400)

    try {
        const databaseProduct = await productModel.findById(productid)
    
        if(!databaseProduct) res.status(404).json({msg: "Product does not exist"})
    
        databaseProduct.product = product
        databaseProduct.category = category
        databaseProduct.price = price

        const updatedProduct = await productModel.findOneAndUpdate({ _id: productid }, databaseProduct, { new: true })
        res.json(updatedProduct)
    } catch (e) {
        console.log("error", e)
        res.status(500)
    }
}

const getProduct = async (req, res) => {
    const productid = req.params.id

    try {
        const databaseProduct = await productModel.findById(productid)

        if (!databaseProduct) res.status(404).json({ msg: "No product found" })

        res.json(databaseProduct)
    } catch (e) {
        console.log("error", e)
        res.status(500)
    }
}

const deleteProduct = async (req, res) => {
    const productid = req.params.id

    try {
        const deletedProduct = await productModel.findOneAndDelete({ _id: productid })
        res.status(201).json(deletedProduct)
    } catch (e) {
        console.log("error", e)
        res.status(500)
    }
}

module.exports = { createProduct, getProducts, updateProduct, getProduct, deleteProduct }