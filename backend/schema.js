import mongoose from 'mongoose'

const userSchema = {
  name: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true }
}

const userModel = mongoose.model('users', userSchema)

export default userModel
