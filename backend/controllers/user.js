import userModel from "../schema.js";

const getAllUsers = async (req, res) => {
    try {
        const Users = await userModel.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
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

}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };