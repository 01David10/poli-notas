import mongoose from "mongoose";

const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
};

const userModel = mongoose.model("students", userSchema);

export default userModel;
