import User from '../schema.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../jwt.js'

const login = async (req, res) => {
  // verificar que no haya sesion iniciada
  // if (req.cookies.token) {
  //   return res
  //     .status(400)
  //     .json({ message: 'Active session. Please close it before strating another' })
  // }

  const { email, password } = req.body

  try {
    //  validar correo
    const userFound = await User.findOne({ email })
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

  res.status(200).json({ message: 'Session closed successful' }) // luego elimino esto

  // return res.redirect('/src/HTML/login.html')
}

export { login, register, logout }
