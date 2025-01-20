import express from 'express'

const router= express.Router()

import {getProductStats,getProduct,getCustomers} from '../controllers/client.controller.js'

router.get('/get-product/',getProduct)
router.get('/get-product-stats/:productId/',getProductStats)
router.get('/get-customers',getCustomers)

export default router