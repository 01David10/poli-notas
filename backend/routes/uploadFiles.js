import express from 'express'
import multer from 'multer'
import { uploadFile } from '../controllers/uploadFiles.js'

const router = express.Router()

// configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage })

// route to upload files
router.post('/upload', upload.single('file'), uploadFile)

export default router
