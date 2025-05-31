import { UserModel } from '../schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../jwt.js'

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    //  validar correo
    const userFound = await UserModel.findOne({ email })
    if (!userFound) {
      return res.status(400).json({ message: 'Email not found' })
    }

    // validar contraseña
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' })
    } else {
      // creacion del token
      const token = await createAccessToken({ userFound })
      // guardar token en la cookie
      res.cookie('token', token, {
        httpOnly: true
      })

      res.json(userFound)
    }
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
    const newUser = new UserModel({
      name,
      dni,
      email,
      password: passwordHash,
      role
    })

    // agregar usuario al esquema
    const userSaved = await newUser.save()

    // creacion del Token
    const token = await createAccessToken({ userSaved })
    // guardar el token en la cookie
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

  res.status(200).json({ message: 'Session closed successful' })
}

const getLoggedUser = async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'No token found' })

  const tokenSecret = process.env.TOKEN_SECRET

  try {
    const user = jwt.verify(token, tokenSecret)
    res.json({ user })
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export { login, register, logout, getLoggedUser }
