import { Router } from "express";

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.js";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:dni", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:dni", updateUser);
router.delete("/deleteUser/:dni", deleteUser);

export default router;