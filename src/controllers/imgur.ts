import axios from "axios";
import express from "express";
import 'dotenv/config';
import {rand_id} from "../helpers";
import {getImgById, createImgUpload, deleteImgById} from "../db/imgur";
import { get, merge } from 'lodash';

export const delete_img = async (req:express.Request, res:express.Response)=>{
    try{

        const {id, ext} = req.params;
        
        if(!id || !ext){
            return res.sendStatus(400);
        }

        const imgDb = await getImgById(id);

        if(!imgDb || !imgDb.deletehash){
            return res.sendStatus(400);
        }

        const options = {
            method: 'DELETE',
            url: `https://api.imgur.com/3/account/${process.env.IMGUR_Username}/image/${imgDb.deletehash}`,
            headers: {
                'Authorization': process.env.IMGUR_BEARER,
            },
          };


          const resp  = await axios.request(options);
          const delDB = await deleteImgById(id);

          return res.json(resp.data).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const upload_img = async (req:express.Request,res:express.Response)=>{
    try{

        if (!process.env.IMGUR_Album_Hash || !req.file || !req.file.mimetype || (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg')) {
            return res.sendStatus(400);
        }

        if (req.file.size > 10000000){
            return res.sendStatus(400);
        }
        
        const slash_pos:number = req.file.mimetype.search("/");
        const only_ext:string = req.file.mimetype.substring(slash_pos+1);


        let form = new FormData();

        form.append('image', new Blob([req.file.buffer]));
        form.append( 'album', process.env.IMGUR_Album_Hash);

        const options = {
            responseType: 'multipart/form-data',
            method: 'POST',
            url: `https://api.imgur.com/3/upload`,
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': process.env.IMGUR_BEARER,
            },
            data:form
          };

          const resp  = await axios.request(options);

        if(resp.status !== 200 || !resp){
            return res.sendStatus(400);
        }

        const data_extr = get(resp, 'data') as unknown as string;
        const {data} = JSON.parse(data_extr)
        
        var idForDB = {};

        do{

            idForDB = rand_id();

        }while(await getImgById(`${idForDB}`))

        const imgFromImgur = await createImgUpload({
            id: idForDB,
            imgur: data.id,
            ext: only_ext,
            deletehash: data.deletehash
        });

        console.log(data);
        return res.redirect(`/img/${idForDB}.${only_ext}`);

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const get_img = async(req:express.Request,res:express.Response)=>{
    try{

        const {id,ext} = req.params;

        const imgDb = await getImgById(id);

        if(!imgDb || !id || !ext){
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

        //console.log(data);

        return res.send(Buffer.from(await data.arrayBuffer()));

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}