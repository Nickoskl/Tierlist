import axios from "axios";
import express from "express";
import 'dotenv/config';
import {rand_id} from "../helpers";
import {getImgById, createImgUpload, deleteImgById} from "../db/imgur";
import { get, merge, parseInt } from 'lodash';
import {imgur_delete, imgur_get, imgur_upload} from '../api/imgur';

export const delete_img = async (req:express.Request, res:express.Response)=>{
    try{

        const {id, ext} = req.params;
        
        const idNum:number = +id;

        const imgDb = await getImgById(idNum);

        if(!imgDb || !imgDb.deletehash){
            return res.sendStatus(400);
        }

        if(ext == imgDb.ext){
            return res.sendStatus(400);
        }

        const resp:Axios.AxiosXHR<unknown> = await imgur_delete(imgDb.deletehash);

        if(resp.status !== 200){
            return resp;
        }

        const delDB = await deleteImgById(parseInt(id));

          return res.json(delDB).end();

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


        const resp:Axios.AxiosXHR<FormData> = await imgur_upload(req.file,process.env.IMGUR_Album_Hash);


        if(resp.status !== 200 || !resp){
            return res.sendStatus(400);
        }

        const data_extr = get(resp, 'data') as unknown as string;
        const {data} = JSON.parse(data_extr)
        
        var idForDB:number = 0;

        do{

            idForDB = rand_id();

        }while(await getImgById(idForDB))

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

        const idNum:number = +id;

        const imgDb = await getImgById(idNum);

        if(!imgDb || !id || !ext){
            return res.sendStatus(400);
        }

        console.log(rand_id());

        const resp:Axios.AxiosXHR<unknown> = await imgur_get(imgDb.imgur);

        if(resp.status !== 200){
            return resp;
        }

        const extract_link:string = get(resp.data, 'data.link') as unknown as string;

        const imgData = await fetch(extract_link);

        //console.log(data);

        return res.send(Buffer.from(await imgData.arrayBuffer()));

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}