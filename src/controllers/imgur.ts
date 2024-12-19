import axios from "axios";
import express from "express";

export const get_account_imgs = async(req:express.Request,res:express.Response)=>{
    try{

        const options = {
            method: 'GET',
            url: 'https://api.imgur.com/3/account/me/images',
            headers: {
                'Authorization': 'Bearer 27fb3b6173bba01b8ea12ea4058fd436612dfebc',
              'x-rapidapi-host': 'imgur-apiv3.p.rapidapi.com'
            }
          };

        const response = await axios.request(options);
	    return res.json(response.data);

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}