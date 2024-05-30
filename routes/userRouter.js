import express from "express";
import UserController from "../controllers/user.js";
import UploadMiddleware from "../middlware/upload.js";


const userRouter = express.Router();
userRouter.get("/avatar",UserController.getAvatar)
userRouter.patch("/avatar",UploadMiddleware.single("avatar"), UserController.updateAvatar);
userRouter.patch("/avatar/",UploadMiddleware.single("avatar"), UserController.uploadAvatar);
export default userRouter;