import path from "node:path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/auth.js";
import "./DB/db.js"
import authMiddelware from "./middlware/auth.js"
import avatarRouter from "./routes/userRouter.js"
import UserController from "./controllers/user.js"
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.post("/users/verify",authMiddelware,UserController.resendMail)
app.get("/api/users/verify/:verificationToken",UserController.verify)

app.use("/api/contacts",authMiddelware, contactsRouter);
app.use("/api/users", userRouter);
app.use("/api/users", avatarRouter);
app.use("/avatars",express.static(path.resolve("public/avatars")))

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});



export default app;