import User from "../models/user.js";
import path from "node:path";
import * as fs  from "node:fs/promises";

async function uploadAvatar(req, res, next) {
    try {
        await fs.rename(req.file.path,
            path.resolve("public/avatars",req.file.filename))
            console.log(req.user);
    const user=await  User.findByIdAndUpdate(req.user.id,{avatarURL:req.file.filename},{new:true
        });
        console.log({user});
        if (user === null) {
            return res.status(404).send({ message: "User not found" });
        };

        if (user.avatar === null) {
            return res.status(404).send({ message: "Avatar not found" });
        };
    
        res.sendFile(path.resolve("public/avatars", user.avatar));

        

        res.send("Upload Avatar")
    } catch (error) {
        
        next(error)
    }
    
};

export default {uploadAvatar};