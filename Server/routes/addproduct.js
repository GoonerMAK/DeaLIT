const express = require('express')
const router = express.Router()

const {addsellProduct, addexchangeProduct, addrentProduct, rentngerequest} = require('../controllers/productController')

const {upload}=require("../controllers/image_setup")

router.post('/addsell', addsellProduct)

router.post('/addrent', addrentProduct)

router.post('/addexchange', addexchangeProduct) //upload.single('photos')
console.log(upload.single('photos'))
 
router.post('/rentrequest', rentngerequest)
// upload.single('photos'),

module.exports=router