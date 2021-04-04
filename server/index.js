import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app=express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts',postRoutes);

app.get('/',(req,res)=>{
    res.send('Hello Users to my Memories project');
})

// const CONNECTION_URL='MONGO_URL'
const PORT=process.env.PORT||5000;
const CONNECTION_URL="mongodb+srv://abhishek:abhishek123@cluster0.ksl0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}`)))
    .catch((err)=> console.log(err.message));

mongoose.set('useFindAndModify',false);


