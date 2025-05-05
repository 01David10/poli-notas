import User from '../schema.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../jwt.js'

const login = async (req, res) => {
  // verificar que no haya sesion iniciada
  if (req.cookies.token) {
    return res
      .status(400)
      .json({ message: 'Ya hay una sesión activa. Cierra sesión primero.' })
  }

  const { email, password } = req.body

  try {
    //  buscar usuario
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(400).json({ message: 'Usuario no Encontrado' })
    }

    // validar contraseña
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }

    // creacion del token (se guarda en la cookie)
    const token = await createAccessToken({ id: userFound.id })
    res.cookie('token', token, {
      httpOnly: true
    })

    console.log('usuario:', userFound)

    res.json({
      dni: userFound.dni,
      name: userFound.name,
      email: userFound.email,
      role: userFound.role
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const register = async (req, res) => {
  const { name, dni, email, password, role } = req.body

  try {
    // encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10)

    // crear Usuario
    const newUser = new User({
      name,
      dni,
      email,
      password: passwordHash,
      role
    })

    // agregar usuario al esquema
    const userSaved = await newUser.save()

    // creacion del Token
    const token = await createAccessToken({ id: userSaved.id })
    res.cookie('token', token, {
      httpOnly: true
    })

    res.json({
      dni: userSaved.dni,
      name: userSaved.name,
      email: userSaved.email,
      role: userSaved.role
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const logout = async (req, res) => {
  res.clearCookie('token')

  res.status(200).json({ message: 'Sesión cerrada' }) // luego elimino esto

  // return res.redirect('/src/HTML/login.html')
}

export { login, register, logout }
