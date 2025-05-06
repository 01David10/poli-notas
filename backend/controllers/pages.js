import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // obtiene la ruta del archivo actual (ya que no se puede usar __dirname por estar en módulos ES)
const __dirname = path.dirname(__filename) // obtiene la ruta del directorio actual

/* session */

// login
function getLoginPage (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/html/login.html'))
}

export { getLoginPage }
