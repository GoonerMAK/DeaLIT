const Product = require('../models/Products')
const mongoose = require('mongoose')



// Add new Product for sell
const addsellProduct = async (req, res) => {
  const {title,desc ,img, price, categories} = req.body //, categories
  console.log(categories)
  //let emptyFields = []

  if(!title || !desc ||!img || !price ||!categories ) {  //||!categories
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
 

  

  // add doc to db
  try {
    const user_id = req.user._id
    const type= "pending"
    const purpose="Sell"
    const product = await Product.create({title ,desc ,img ,price, user_id, type, purpose, categories}) //, categories
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//add product for exchange
const addexchangeProduct = async (req, res) => {
  const {user_email, title,desc ,img, preference, categories, exchangetype} = req.body //, categories
  console.log(user_email, title,desc ,img, preference, categories, exchangetype)
  //let emptyFields = []

  if(!title || !desc ||!img || !preference ||!exchangetype ||!categories ) {  //||!categories
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
 

  

  // add doc to db
  try {
    //const user_id = req.user._id
    const type= "pending"
    const purpose="Exchange"
    console.log({user_email, title ,desc ,img ,preference,  exchangetype, type, purpose, categories})
    const product = await Product.create({user_email, title ,desc ,img ,preference, exchangetype, type, purpose, categories}) //, categories
    console.log(product)
    console.log("addition worked")
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//add product for rent
const addrentProduct = async (req, res) => {
  const {title,desc ,img, price,  prefer, categories} = req.body //, categories
  console.log(categories)
  //let emptyFields = []

  if(!title || !desc ||!img ||! price  ||!prefer ||!categories ) {  //||!categories
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
 

  

  // add doc to db
  try {
    const user_id = req.user._id
    const type= "pending"
    const purpose="Rent"
    const product = await Product.create({title ,desc ,img ,prefer, user_id, price,  type, purpose, categories}) //, categories
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}




module.exports = {
  addsellProduct,
  addexchangeProduct,
  addrentProduct
}