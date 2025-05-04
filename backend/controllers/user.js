import userModel from "../schema.js";

const getAllUsers = async (req, res) => {
    try {
        const Users = await userModel.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserByDni = async (req, res) => {
    try {
        const user = await userModel.findOne ({ dni: req.params.dni });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findOneAndUpdate(
            { dni: req.params.dni },
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.deleteOne({ dni: req.params.dni });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllUsers, getUserByDni, createUser, updateUser, deleteUser };