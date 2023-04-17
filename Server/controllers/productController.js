const Product = require('../models/Products')
const mongoose = require('mongoose')
const Rentrequest= require('../models/rentrequest')



// Add new Product for sell
const addsellProduct = async (req, res) => {
  const {user_email,title,desc ,img, price, categories} = req.body //, categories
  console.log(categories)
  //let emptyFields = []

  if(!title || !desc ||!img || !price ||!categories ) {  //||!categories
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
 

  

  // add doc to db
  try {
    // const user_id = req.user._id
    const type= "pending"
    const purpose="Sell"
    const product = await Product.create({user_email, title ,desc ,img ,price, type, purpose, categories}) //, categories
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//add product for exchange
const addexchangeProduct = async (req, res) => {
  // const title= req.body.title
  // const user_email= req.body.user_email
  // const desc= req.body.desc
  // const preference= req.body.preference
  // const categories = req.body.categories
  // const exchangetype = req.body.exchangetype
  // const img = req.files.originalname
  const {user_email, title,desc ,img, preference, categories, exchangetype} = req.body //, categories
  console.log(req.body)
  // console.log(req)
 
 
   console.log(user_email, title,desc,img, preference, categories, exchangetype)
  //let emptyFields = []

  if(!title || !desc  || !preference ||!exchangetype ||!categories ) {  //||!categories ||!img
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
 

  

  // add doc to db
  try {
    //const user_id = req.user._id
    const type= "pending"
    const purpose="Exchange"
    //const img="fhgfhgf"
    // console.log({user_email, title ,desc ,img ,preference,  exchangetype, type, purpose, categories})
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
  const {user_email,title,desc ,img, price,  prefer, categories} = req.body //, categories
  console.log(categories)
  //let emptyFields = []

  if(!title || !desc ||!img ||! price  ||!prefer ||!categories ) {  //||!categories
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
 

  

  // add doc to db
  try {
    // const user_id = req.user._id
    const type= "pending"
    const purpose="Rent"
    const product = await Product.create({user_email, title ,desc ,img ,prefer, price,  type, purpose, categories}) //, categories
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//sent request for exchange
const exchangerequest = async (req, res) => {
  const {} = req.body
}

const rentngerequest = async (req, res) => {
  const {owner_email, sender_email, objectid} = req.body 
  var return_date=req.body.return_date
  console.log(req.body)
  return_date= new Date(return_date)
  console.log(return_date)
  console.log(owner_email, sender_email, objectid, return_date)
  if(!owner_email|| !sender_email|| !objectid|| !return_date){
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }
  try {
    // const user_id = req.user._id
    
    const rentrequest = await Rentrequest.create({owner_email, sender_email, objectid, return_date})
    console.log(rentrequest) //, categories
    res.status(200).json(rentrequest)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}




module.exports = {
  addsellProduct,
  addexchangeProduct,
  addrentProduct,
  rentngerequest
}