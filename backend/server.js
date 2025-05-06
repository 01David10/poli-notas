import express from 'express'
import cookieParser from 'cookie-parser'

import DatabaseConnection from './db.js'

import userRoutes from '../backend/routes/user.js'
import sessionRoutes from './routes/session.js'
import pagesRoutes from './routes/pages.js'

// start server
const app = express()

// set port
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/login')
})

// connect to database
DatabaseConnection()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static('frontend')) // incluir el frontend

// routes
app.use('/', pagesRoutes)
app.use('/users', userRoutes)
app.use('/session', sessionRoutes)
