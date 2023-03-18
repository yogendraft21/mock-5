const express = require("express");
const { BookingModel } = require("../models/Booking.model");
const { FlightModel } = require("../models/Flight.model");
const BookingRouter = express.Router();
BookingRouter.post("/",async(req,res)=>{
    const {flight_id,userID} = req.body;
    try {
        const flight = await FlightModel.findOne({_id:flight_id});
        if(flight){
            const book = new BookingModel({user:userID,flight:flight_id})
            await book.save();
            res.send("Booking Confirmed")
        }else{
            res.send("No flight Found")
        }
        
    } catch (error) {
        console.log(error);
        res.send("error with booking")
    }
})

module.exports={
    BookingRouter
}