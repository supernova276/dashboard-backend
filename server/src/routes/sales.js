import express from 'express'
import { getOverallStats } from '../controllers/sales.controller.js'

const router= express.Router()

router.get('/get-overall-stats',getOverallStats)

export default router