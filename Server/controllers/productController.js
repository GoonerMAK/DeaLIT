const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all Products
const getProducts = async (req, res) => {
  const user_id = req.user._id

  const Products = await Product.find({user_id}).sort({createdAt: -1})

  res.status(200).json(Products)
}

// get a single Product
const getProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Product'})
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).json({error: 'No such Product'})
  }
  
  res.status(200).json(product)
}


// create new Product
const createProduct = async (req, res) => {
  const {title,desc ,img, price, categories} = req.body //, categories
  console.log(categories)
  //let emptyFields = []

  if(!title || !desc ||!img || !price ||!categories ) {  //||!categories
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
  //using emptyfiels
  // let emptyFields = []

  // if(!title) {
  //   emptyFields.push('title')
  // }
  // if(!load) {
  //   emptyFields.push('load')
  // }
  // if(!reps) {
  //   emptyFields.push('reps')
  // }
  // if(emptyFields.length > 0) {
  //   return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  // }

  

  // add doc to db
  try {
    const user_id = req.user._id
    const type= "pending"
    const product = await Product.create({title ,desc ,img ,price, user_id, type, categories}) //, categories
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a Product
const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Product'})
  }

  const Product = await Product.findOneAndDelete({_id: id})

  if (!Product) {
    return res.status(400).json({error: 'No such Product'})
  }

  res.status(200).json(Product)
}

// update a Product
const updateProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Product'})
  }

  const Product = await Product.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!Product) {
    return res.status(400).json({error: 'No such Product'})
  }

  res.status(200).json(Product)
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
}