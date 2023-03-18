const express = require("express")
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.route");
const cors = require("cors");
const { BookingRouter } = require("./routes/Booking.route");
const { DashboardRouter } = require("./routes/Dashboard.route");
const { FlightRouter } = require("./routes/Flight.route");
const { auth } = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    res.send("Welcome Air Ticket System")
})

app.use("/api",UserRouter)
app.use("/api/flights",FlightRouter)
app.use(auth);
app.use("/api/booking",BookingRouter)
app.use("/api/dashboard",DashboardRouter)

app.listen(8081,async()=>{
    try {
        await connection;
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
})