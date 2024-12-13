import express from 'express'
import { signup, login } from '../Controllers/user.controllers.js'

const UserRouter = express.Router();

UserRouter.post("/signup", signup)
.post("/login",login )

export default UserRouter