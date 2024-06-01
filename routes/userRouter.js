import express from "express";
import UserController from "../controllers/user.js";
import UploadMiddleware from "../middlware/upload.js";
import authMiddelware from "../middlware/auth.js"

const userRouter = express.Router();

userRouter.get("/avatar",authMiddelware,UserController.getAvatar)
userRouter.patch("/avatar",authMiddelware,UploadMiddleware.single("avatar"), UserController.updateAvatar);
userRouter.patch("/avatar/",authMiddelware,UploadMiddleware.single("avatar"), UserController.uploadAvatar);

export default userRouter;