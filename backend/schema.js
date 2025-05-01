import mongoose from "mongoose";

const userSchema = {
    name: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
    grade: { type: String},
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
};

const userModel = mongoose.model("students", userSchema);

export { userModel };
