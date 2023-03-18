const mongoose = require("mongoose")

const BookingSchema = mongoose.Schema({
    user:{type:String,ref:'users'},
    flight:{type:String,ref:'flights'}
})

const BookingModel = mongoose.model("bookings",BookingSchema)
module.exports={
    BookingModel
}