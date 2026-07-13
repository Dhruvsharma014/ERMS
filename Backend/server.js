const express = require('express');
require('dotenv').config();
const User = require('./src/models/userSchema');
const connectDB = require('./src/config/database')
const userRoutes = require('./src/routes/userRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const dashboardRoutes = require('./src/routes/dashboardRoutes')
const errorHandler = require('./src/middleware/errorHandler')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
connectDB();
app.use(cookieParser());
app.use(
    cors({
        origin:process.env.FRONTEND_URL,
        credentials: true
    })
)




app.use(
  "/uploads/photos",
  express.static(path.join(__dirname, "src", "uploads", "photos"))
);

app.use(
  "/uploads/cv",
  express.static(path.join(__dirname, "src", "uploads", "cv"))
);


app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is running"
    })
})
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/dashboard', dashboardRoutes);

app.use(errorHandler)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log("Server is Running")

})