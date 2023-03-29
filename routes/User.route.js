const express = require("express");
const nodemailer = require('nodemailer');
const path = require('path');

const User = require("../models/User.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserRouter = express.Router();
require("dotenv").config();
const pathOne=path.dirname(__dirname).split('/').pop();
const pathAct=path.dirname(pathOne).split('/').pop();
// console.log(pathAct);
UserRouter.get("/",(req,res)=>{
    res.send("User")
})

UserRouter.post("/register",async(req,res)=>{
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          isVerified: false,
        });
        await newUser.save();
        // send verification email
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'yogendra311204@gmail.com',
                pass: 'leuxgpaczkmsincn'
            }
        });
    
        const token = jwt.sign(
          { email },
          'secret-key',
          { expiresIn: '1h' }
        );
    
        const link = `http://localhost:8081/api/verify/${token}`;
    
        await transporter.sendMail({
          from: 'yogendra311204@gmail.com',
          to: email,
          subject: 'Verify your email',
          html: `
            <h1>Welcome to the chat app!</h1>
            <p>Please click the following link to verify your email address:</p>
            <a href="${link}">${link}</a>
          `,
        });
    
        res.status(201).json({ message: 'User created' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
       
})

UserRouter.get('/verify/:token', async (req, res) => {
    try {
      const { email } = jwt.verify(req.params.token, 'secret-key');
  
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.send("Verify Success")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body);
    try {
        const user = await User.findOne({email:email})
        // console.log(user);
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