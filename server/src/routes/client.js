import express from 'express'

import {getProductStats,getProduct,getCustomers,getTransactions} from '../controllers/client.controller.js'

const router= express.Router()

router.get('/get-product/',getProduct)
router.get('/get-product-stats/:productId/',getProductStats)
router.get('/get-customers',getCustomers)
router.get('/get-transactions',getTransactions)

export default router