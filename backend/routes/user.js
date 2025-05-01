import { Router } from "express";

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.js";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;