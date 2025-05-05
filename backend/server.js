import express from 'express'
import cookieParser from 'cookie-parser'
import DatabaseConnection from './db.js'
import userRoutes from '../backend/routes/user.js'
import sessionRoutes from './routes/session.js'

// start server
const app = express()

// set port
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})

// connect to database
DatabaseConnection()

// middlewares
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/users', userRoutes)
app.use('/session', sessionRoutes)
