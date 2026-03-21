import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './router';
import startCronAssetCleanup from './helpers/tempFileCleanup'
import './helpers/logger'; 
//---------/\
//---------||
//I implemented an app cli to discord webhook poster-
//for app updates and errors along with the self hosted uptime kuma that I have.
//I didnt want to focus on this now and I made it with AI so I will not include-
//it in my commit until I do it myself by hand.

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router());

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server running on 5000`);
})

const MONGO_DB: string = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_DB);
mongoose.connection.on('error', (error: Error) => console.log(error) );
mongoose.connection.on('connected', () => console.log(`Connected to ${MONGO_DB}`) );
console.log(new Date(Date.now() - 100*60 * 60 * 1000));
console.log(new Date(Date.now()));
startCronAssetCleanup();