const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1];
    console.log(token);
    try {
        if(token){
            const decode = jwt.verify(token,"yogi")
            // console.log(decode);
            if(decode){
                const userID = decode.userID;
                req.body.userID = userID;
                next();
            }else{
                res.send("Invalid Credential")
            }
        }else{
            res.send("You are not Authorize user")
        }
    } catch (error) {
        console.log(error);
        res.send("Problem with auth")
    }
}
module.exports={
    auth
}