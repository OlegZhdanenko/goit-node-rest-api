import express from "express"
const userRouter = express.Router();
import authControllers from "../controllers/authControllers.js";


const jsonParser = express.json();

userRouter.post("/register", jsonParser, authControllers.register);
userRouter.post("/login", jsonParser, authControllers.login);
export default userRouter;