import axios from "axios";
import express from "express";
import 'dotenv/config';

export const get_account_imgs = async(req:express.Request,res:express.Response)=>{
    try{

        const options = {
            method: 'GET',
            url: 'https://api.imgur.com/3/account/me/images',
            headers: {
                'Authorization': process.env.IMGUR_BEARER,
            }
          };

        const response = await axios.request(options);
	    return res.json(response.data);

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}