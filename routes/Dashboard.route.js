const express = require("express");
const { BookingModel } = require("../models/Booking.model");
const { FlightModel } = require("../models/Flight.model");
const DashboardRouter = express.Router();

DashboardRouter.get("/",async(req,res)=>{
    const {userID} = req.body;
    let details=[];
    try {
        const flights = await BookingModel.find({user:userID})
        flights.forEach(async(flight)=>{
            let de  = await FlightModel.find({_id:flight.flight})
            console.log(de);
        })
        res.send("All Your Flights Here")
    } catch (error) {
        console.log(error);
        res.send("Error with loading fights")
    }
})

module.exports={
    DashboardRouter
}