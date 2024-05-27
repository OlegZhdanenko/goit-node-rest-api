import User from "../models/user.js"
import bcrypt from "bcrypt"
async function register(req, res, next) {
    const { password, email} = req.body;
    
    const emailToLowerCase = email.toLowerCase()

    try {
        const user = await User.findOne({ emailToLowerCase });
        if (user!==null) {
            return res.status(409).send({
                "message": "Email in use"
            });
        }

    const passwordHash=await bcrypt.hash(password,10)   

    await User.create({
            password: passwordHash,
            email: emailToLowerCase
        });
        
        res.status(201).send({ user: { email,password} });
    } catch (error) {
        next(error)
    }
}


async function login(req, res, next) {
    const { email, password } = req.body;
    const emailToLowerCase = email.toLowerCase();
    

    try {
        const user = User.findOne({ email: emailToLowerCase })
    
        if (user === null) {
            console.log("email");
        return  res.status(401).send({
                "message": "Email or password is wrong"
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
    
        if (isMatch === false) {
    console.log("isMatch");
    return res.status(401).send({
        "message": "Email or password is wrong"
    });
        };
        res.status(200).send({ token: "Token" })
    } catch (error) {
        next(error)
    }
}

export default { register ,login}; 