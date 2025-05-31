import dotenv from 'dotenv'
import { BlobServiceClient } from '@azure/storage-blob'

dotenv.config()

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ningún archivo.' })
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    )
    const containerClient = blobServiceClient.getContainerClient('apuntes')

    const originalName = req.file.originalname
    const blobName = Date.now() + '-' + originalName
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    await blockBlobClient.uploadData(req.file.buffer)

    res.status(200).json({
      message: 'Archivo subido correctamente',
      url: blockBlobClient.url
    })
  } catch (error) {
    console.error('Error al subir el archivo:', error.message)
    res.status(500).json({ error: 'No se pudo subir el archivo.' })
  }
}

export { uploadFile }
