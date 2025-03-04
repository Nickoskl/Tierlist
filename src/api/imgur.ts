import axios from "axios";
import express from "express";
import 'dotenv/config';

export const imgur_delete = async (deletehash:string):Promise<Axios.AxiosXHR<unknown>>=>{

        const options = {
            method: 'DELETE',
            url: `https://api.imgur.com/3/image/${deletehash}`,
            headers: {
                'Authorization': process.env.IMGUR_BEARER,
            },
          };


          const resp  = await axios.request(options);



          return resp;
}

export const imgur_upload = async (file:Express.Multer.File, album:string):Promise<Axios.AxiosXHR<FormData>> =>{


            let form = new FormData();
    
            form.append('image', new Blob([file.buffer]));
            form.append( 'album', album);
    
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

              return resp;
}

export const imgur_get = async (id:string):Promise<Axios.AxiosXHR<unknown>>=>{


        const options = {
            method: 'GET',
            url: `https://api.imgur.com/3/account/${process.env.IMGUR_Username}/image/${id}`,
            headers: {
                'Authorization': process.env.IMGUR_BEARER,
            }
          };

        const resp = await axios.request(options);
        

        return resp;
}