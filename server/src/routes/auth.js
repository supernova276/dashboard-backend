import express from 'express'
import {userSignup,userLogin,addProduct,delProduct,addProductStats,createTransactions,createOverallStat} from '../controllers/auth.controller.js'

const router= express.Router()

router.post('/signup/',userSignup)
router.post('/login/',userLogin)
router.post('/add-product',addProduct)
router.post('/delete-product/product',delProduct)
router.post('/add-product-stats',addProductStats)
router.post('/create-transaction',createTransactions)
router.post('/create-stat',createOverallStat)
// router.post('/delete-product-stats',deleteProductStats)

export default router