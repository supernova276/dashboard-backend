import express from 'express'

import {getProductStats,getProduct,getCustomers,getTransactions} from '../controllers/client.controller.js'
import { authenticateToken } from "../middleware/auth.middleware.js"; 

const router= express.Router()

router.get('/get-product/',authenticateToken,getProduct)
router.get('/get-product-stats/:productId/',authenticateToken,getProductStats)
router.get('/get-customers',authenticateToken,getCustomers)
router.get('/get-transactions',authenticateToken,getTransactions)

export default router