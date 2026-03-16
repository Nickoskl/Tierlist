import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken, getUserById } from '../db/users';
import { getImgById } from '../db/imgur';
import { getTierlistById } from '../db/tier_list';

export const mustBeLoggedIn = async (req:express.Request, res: express.Response, next: express.NextFunction) =>{
    try{

        const sessiontoken = req.cookies['user_auth']

        if(!sessiontoken){
            console.log("no session token")
            return res.sendStatus(400);
        }

        const userExists = await getUserBySessionToken(sessiontoken);

        if(!userExists){
            console.log("user does not exist");
            return res.sendStatus(403);
        }

        merge(req, { identity: userExists});
        
        return next();

    }catch(error){
        console.log("Error on mustbelogged in func");
        return res.sendStatus(400);
    }
}

export const mustBeOwnerOrAdmin_Users = async (req:express.Request, res:express.Response, next:express.NextFunction) =>{
    try{

        const loggedInUserSuper = get(req, 'identity.super') as unknown as boolean;



        const {id} = req.params;
        const cookie:string = req.cookies['user_auth'];
        const searchtoken = await getUserById(id).select('+session.token');
        const loggedIntoken = await getUserBySessionToken(cookie).select('+session.token');
        if (!loggedIntoken || !loggedIntoken.session || !searchtoken || !searchtoken.session){
            return res.sendStatus(403);
        }
        const index = loggedIntoken.session.token.indexOf(cookie)
        if ((searchtoken.session.token[0] !== loggedIntoken.session.token[0]) && loggedInUserSuper==false){
            console.log(loggedIntoken.session.token[0]);
            return res.sendStatus(403);
        }
        return next();

    }catch(error){
        console.log("Error on mustbeowner in func");
        
        return res.sendStatus(400);
    }
}

export const mustBeAdmin = async (req:express.Request, res:express.Response, next:express.NextFunction) =>{
    try{

        const isSuper = get(req, 'identity.super') as unknown as boolean;

        if(!isSuper){
            return res.sendStatus(403);
        }

        return next();

    }catch(error){
        console.log("Error on mustBeAdmin in func");
        return res.sendStatus(400);
    }
}

export const mustBeOwnerOrAdmin_Assets = async (req:express.Request, res:express.Response, next:express.NextFunction) =>{
    try{

        const loggedInUserSuper = get(req, 'identity.super') as unknown as boolean;

        // if(loggedInUserSuper){
        //     return next();
        // }



        const cookie:string = req.cookies['user_auth'];
        const loggedIntoken = await getUserBySessionToken(cookie);
        if (!loggedIntoken){
            return res.sendStatus(403);
        }

        if(req.path.startsWith('/img/')){

            const id:number = +req.params.id;

            const imgDb = await getImgById(id);

            if(!imgDb || !imgDb.by){

                return res.sendStatus(400);

            }

            if(imgDb.by ==loggedIntoken.id){
                return next();
            }else{
                return res.sendStatus(403);
            }


        }else if(req.path.startsWith('/tierlist/')){

        const id = req.params.id;

        const tierlist = await getTierlistById(id);


            if(!tierlist || !tierlist.by){
                return res.sendStatus(400);
            }

            if(tierlist.by ==loggedIntoken.id){
                return next();
            }else{
                return res.sendStatus(403);
            }

        }else{

            console.log("Malformed Url");
            return res.sendStatus(400);

        }

    }catch(error){
        console.log("Error on mustbeowner in func");
        
        return res.sendStatus(400);
    }
}