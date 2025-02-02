import express from 'express'
import { getOverallStats } from '../controllers/sales.controller.js'
import {authenticateToken} from '../middleware/auth.middleware.js'

const router= express.Router()

router.get('/get-overall-stats',authenticateToken,getOverallStats)

export default router