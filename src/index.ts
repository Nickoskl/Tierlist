import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

app.use(cors({credentials: true,}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server running on 5000`);
})

app.get('/', (req, res)=>{
    console.log('Request GET to root /')
    res.sendStatus(418);
})

const MONGO_DB: string = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_DB);
mongoose.connection.on('error', (error: Error) => console.log(error) );
mongoose.connection.on('connected', () => console.log(`Connected to ${MONGO_DB}`) );