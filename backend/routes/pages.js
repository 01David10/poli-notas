import { Router } from 'express'
import { getLoginPage, getIndexPage, getProfilePage } from '../controllers/pages.js'

const router = Router()

router.get('/login', getLoginPage)
router.get('/index', getIndexPage)
router.get('/profile', getProfilePage)

export default router
