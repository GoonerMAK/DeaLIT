const express = require('express')
const router = express.Router()

const {addsellProduct, addexchangeProduct, addrentProduct} = require('../controllers/productController')

router.post('/addsell', addsellProduct)

router.post('/addrent', addrentProduct)

router.post('/addexchange', addexchangeProduct)

module.exports=router