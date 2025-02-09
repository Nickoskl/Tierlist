import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken, getUserById } from '../db/users';

export const mustBeLoggedIn = async (req:express.Request, res: express.Response, next: express.NextFunction) =>{
    try{

        const sessiontoken = req.cookies['user_auth']

        if(!sessiontoken){
            console.log("no session token")
            return res.redirect('/user/login');
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

export const mustBeOwnerOrAdmin = async (req:express.Request, res:express.Response, next:express.NextFunction) =>{
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
        if (searchtoken.session.token !== loggedIntoken.session.token && loggedInUserSuper==false){
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