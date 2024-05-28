import jwt from "jsonwebtoken"
function auth(req, res, next) {

    const authorizationHeader = req.headers.authorization;
    console.log({authorizationHeader});
    if (typeof authorizationHeader==="undefined") {
        return res.status(401).send({message:"Invalid token"})
    };


    const arrayOfAuthorizationHeader = authorizationHeader.split(" ");
    const token = arrayOfAuthorizationHeader[2];
    const bearer = arrayOfAuthorizationHeader[0];
    console.log({arrayOfAuthorizationHeader});
    // const [bearer, token] = authorizationHeader.split(" ", 2);
    console.log({ bearer, token });
    if (bearer!=="Bearer") {
        return res.status(401).send({message:"Invalid token2"})
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).send({ message: "Invalid token3" });
        };
        console.log({ decode });
        
        req.user = {
            id: decode.id,
            name:decode.name
}

next();
    })
    
}
export default auth;