const express = require("express");
const { FlightModel } = require("../models/Flight.model");
const FlightRouter = express.Router();

FlightRouter.get("/",async(req,res)=>{
    const flights = await FlightModel.find();
    // console.log(flights);
    res.send(flights)
})
FlightRouter.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const flights = await FlightModel.findOne({_id:id});
    if(flights){
        res.send(flights)
    }else{
        res.send("No Flight Available with this id")
    }
})
FlightRouter.post("/",async(req,res)=>{
    const flight = new FlightModel(req.body);
    await flight.save()
    res.send("Flight added")
})
FlightRouter.patch("/:id",async(req,res)=>{
    const fid = req.params.id;
    console.log(fid);
    try {
        const flight = await FlightModel.findOne({_id:fid});
        if(flight){
            await FlightModel.findByIdAndUpdate({_id:fid},req.body);
            res.send("Flight Updated")
        }else{
            res.send("No flight with this id")
        }
        
    } catch (error) {
        console.log(error);
        res.send("Problem with Update Info")
    }
   
})
FlightRouter.delete("/:id",async(req,res)=>{
    const fid = req.params.id;
    console.log(fid);
    try {
        const flight = await FlightModel.findOne({_id:fid});
        if(flight){
            await FlightModel.findByIdAndDelete({_id:fid},req.body);
            res.send("Flight Deleted")
        }else{
            res.send("No flight with this id")
        }
        
    } catch (error) {
        console.log(error);
        res.send("Problem with Delete Flight")
    }
   
})

module.exports={
    FlightRouter
}