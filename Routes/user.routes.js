import express from 'express'
import { signup, login, getUser, logout, deleteUser, updateUser } from '../Controllers/user.controllers.js'
import auth from '../MiddleWares/auth.js';

const UserRouter = express.Router();

UserRouter.post("/signup", signup)
.post("/login",login )
.get("/getuser", auth, getUser)
.patch("/update", auth, updateUser)
.delete("/delete", auth, deleteUser)
.post("/logout", auth, logout)

export default UserRouter