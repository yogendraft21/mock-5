const express  = require('express');
const { connection } = require('./config/db');
const { auth } = require('./middleware/auth');
const { UserRouter } = require('./routes/User.route');

var cors = require('cors')
const app = express();
app.use(express.json())


app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get("/",(req,res)=>{
    res.send("Welcome to Chat App")
})

app.use("/api",UserRouter);
app.use(auth);
const server = app.listen(8081,async()=>{
    try {
        await connection;
        console.log("DB Connected");
        console.log("server is running on port 8081");
    } catch (error) {
        console.log(error);
    }
})

// server = app.listen( process.env.PORT || 8081);

const io = require("socket.io")(server,{
    cors: {
      origin: '*'
    }
  });
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('chatMessage', (msg) => {
      console.log('message: ', msg);
      io.emit('chatMessage', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });