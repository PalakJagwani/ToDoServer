import express from "express";
import { signupUser, loginUser, signoutUser } from "../Controller/UserController.js";

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.delete('/signout/:id', signoutUser)

export default router