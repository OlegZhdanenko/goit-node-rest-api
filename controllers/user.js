import User from "../models/user.js";
import path from "node:path";
import * as fs  from "node:fs/promises";
import Jimp from "jimp";
import jwt from "jsonwebtoken"
async function uploadAvatar(req, res, next) {
    try {
        await fs.rename(req.file.path,
            path.resolve("public/avatars",req.file.filename))
            
    const user=await  User.findByIdAndUpdate(req.user.id,{avatarURL:req.file.filename},{new:true});
        if (user === null) {
            return res.status(404).send({ message: "User not found" });
        };

        if (user.avatar === null) {
            return res.status(404).send({ message: "Avatar not found" });
        };

        res.send(user)
    } catch (error) {
        
        next(error)
    }
    
};
async function getAvatar(req, res, next){
try {
    const user = await User.findById(req.user.id)
    if (user === null) {
        return res.status(404).send({ message: "User not found" });
    };

    if (user.avatar === null) {
        return res.status(404).send({ message: "Avatar not found" });
    };
    res.status(200).sendFile(path.resolve("public/avatars", user.avatarURL));
} catch (error) {
    
}
}
async function updateAvatar(req, res, next){
    try {
        const { path: currentPath, filename } = req.file;
        const newPath = path.resolve(`public/avatars/${filename}`);
        const avatar = await Jimp.read(currentPath);
        avatar.resize(250, 250).write(currentPath);

        await fs.rename(currentPath, newPath);

        const authorizationHeader = req.headers.authorization.split(" ");
        const token = authorizationHeader[1];
        const data = jwt.decode(token);

        const user = await User.findByIdAndUpdate(
            data.id,
            { avatarURL: newPath },
            { new: true }
        );

        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
}
export default {uploadAvatar,getAvatar,updateAvatar};