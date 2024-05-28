import jwt from "jsonwebtoken";
import User from "../models/user.js"
import user from "../models/user.js";

 function auth(req, res, next) {

    const authorizationHeader = req.headers.authorization;
    console.log({authorizationHeader});
    if (typeof authorizationHeader==="undefined") {
        return res.status(401).send({message:"Invalid token"})
    };


    
    const [bearer,token] = authorizationHeader.split(" ",2);

    
    console.log({ bearer, token });
    if (bearer!=="Bearer") {
        return res.status(401).send({message:"Invalid token "})
    };
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {

            return res.status(401).send({ message: "Invalid token " });
        };
try {
    const user = await User.findById(decode.id)
        if (user === null) {
        return res.status(401).send({message:"Invalid token "})
    };
        if (user.token === token) {
        return res.status(401).send({message:"Invalid token "})
    };
    
} catch (error) {
    next(error)
        };
       
        console.log({ decode });
        
        req.user = {
            id: user.id,
            name:user.name
}

next();
    })
    
}
export default auth;