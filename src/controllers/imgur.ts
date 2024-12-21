import axios from "axios";
import express from "express";
import 'dotenv/config';
import {rand_id} from "../helpers";
import {getImgById} from "../db/imgur";
import { get, merge } from 'lodash';

export const get_img = async(req:express.Request,res:express.Response)=>{
    try{

        const {id} = req.params;

        const imgDb = await getImgById(id);

        if(!imgDb){
            return res.sendStatus(400);
        }

        console.log(rand_id());
        const options = {
            method: 'GET',
            url: `https://api.imgur.com/3/account/${process.env.IMGUR_Username}/image/${imgDb.imgur}`,
            headers: {
                'Authorization': process.env.IMGUR_BEARER,
            }
          };

        const response = await axios.request(options);

        if (!response || !response.data ){
            return res.sendStatus(400);
        }

        const extract_link:string = get(response.data, 'data.link') as unknown as string;
        
        const data = await fetch(extract_link);

        console.log(data);

        return res.send(Buffer.from(await data.arrayBuffer()));

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}