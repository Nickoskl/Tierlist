import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './router';

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

// app.get('/', (req, res)=>{
//     console.log('Request GET to root /')
//     res.sendStatus(418);
// })

const MONGO_DB: string = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_DB);
mongoose.connection.on('error', (error: Error) => console.log(error) );
mongoose.connection.on('connected', () => console.log(`Connected to ${MONGO_DB}`) );
console.log(Date.now());