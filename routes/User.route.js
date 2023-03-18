const express = require("express");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserRouter = express.Router();
require("dotenv").config();
UserRouter.get("/",(req,res)=>{
    res.send("User")
})

UserRouter.post("/register",(req,res)=>{
    const {username,email,password} = req.body;
    try {
        bcrypt.hash(password,10,async(err,hash)=>{
            const user = new UserModel({username:username,email:email,password:hash});
            await user.save();
            res.send("Signup Success");
        })
    } catch (error) {
        console.log("Problem in Signup");
    }
})
UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body);
    try {
        const user = await UserModel.findOne({email:email})
        console.log(user);
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({"userID":user._id},process.env.SECRET_KEY)
                    res.send({"msg":"Login Success","token":token})
                }else{
                    res.send("Invalid Token")
                }
            })
        }else{
            res.send("Invalid Detail")
        }
    } catch (error) {
        console.log("Problem in Login");
    }
})
module.exports={
    UserRouter
}