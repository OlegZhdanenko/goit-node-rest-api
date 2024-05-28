import express from "express"
import authControllers from "../controllers/authControllers.js";



const userRouter = express.Router();
const jsonParser = express.json();

userRouter.post("/register", jsonParser, authControllers.register);
userRouter.post("/login", jsonParser, authControllers.login);
userRouter.get("/logout", authControllers.logout);
userRouter.get("/current",authControllers.logout)


export default userRouter;