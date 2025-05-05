import { Router } from 'express'
import { login, register, logout } from '../controllers/sesion.js'

const router = Router()

// Rutas para el login y registro de usuarios
router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

export default router
