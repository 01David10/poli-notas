import { Router } from 'express'
import { getLoginPage } from '../controllers/pages.js'

const router = Router()

router.get('/login', getLoginPage)

export default router
