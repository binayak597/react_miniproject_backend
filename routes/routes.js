import { Router } from "express";
import { UserModel } from "../model/userModel.js";
import { registerUser, loginUser, updateUser, deleteUser, getUser } from "../controller/userController.js";

const router = Router();

router.get("/:id", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
export { router };