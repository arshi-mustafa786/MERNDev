const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();



const app = express();
const port = process.env.PORT || 3002;
const URI = process.env.ATLAS_URI;




app.use(cors());
app.use(express.json());

mongoose.connect(URI,{useNewUrlParser:true,useCreateIndex:true}).then(()=>console.log("DONE")).catch((err)=>console.log(err));
const connection = mongoose.connection;
connection.once('open',()=> console.log("database connection successfull"));
connection.once('error',(e)=> console.log(e));


const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/user');
app.use('/user',userRouter);
app.use('/exercise',exerciseRouter);
app.listen(port, () => {
    console.log("Server is running on port "+port)
});



