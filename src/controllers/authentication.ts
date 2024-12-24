import express from 'express';
import { getUserByEmail, createUser, getUserBySessionToken, getUserById, deleteUserById, getUsers } from '../db/users';
import { random, authentication } from '../helpers';
import { forEach, get } from 'lodash';
import { deleteTierlistById } from '../db/tier_list';
import { imgur_upload, imgur_delete } from '../api/imgur';
import { createImgUpload, getImgById } from '../db/imgur';
import { rand_id } from "../helpers";

export const users_lists_get = async (req:express.Request, res:express.Response) =>{
    try{

        const {id} = req.params;

        const lists = await getUserById(id);

        if(!lists){
            return res.sendStatus(400);
        }

        return res.status(200).json(lists.lists).end();

    }catch(error){

    }
}

export const users_get = async (req:express.Request, res: express.Response) =>{
    try{

        const users = await getUsers();

        return res.status(200).json(users).end();

    }catch(error){
        console.log("Error on users_get in func");
        return res.sendStatus(400);
    }
}
export const user_delete = async (req:express.Request, res:express.Response) =>{
    try{
        
        const {id} = req.params;

        const user = await getUserById(id);

        if(!user || !user.lists || !user.avatar){
            return res.sendStatus(400);
        }
        const dot_pos:number = user.avatar.search(".");
        const only_id:string = user.avatar.substring(dot_pos);

        const avatarToDel =  await getImgById(parseInt(only_id));

        if(!avatarToDel){
            return res.sendStatus(400);
        }

        user.lists.forEach(async tierlist => {
            await deleteTierlistById(tierlist);
        });


        const user_del = await deleteUserById(id);

        const imgDeleted = await imgur_delete(avatarToDel.deletehash);

        return res.json(user_del);


    }catch(error){
        console.log("Error on user_delete in func");
        return res.sendStatus(400);
    }
}


export const user_edit = async (req:express.Request, res:express.Response) =>{
    try{
        const {id} = req.params;
        const {email, password_new, password_old, username, img} = req.body;
    
        const user = await getUserById(id).select('+session.token +session.date +session.ip +authentication.salt +authentication.password');
    
        if(!user || !user.session || !user.authentication || !user.authentication.salt){
            return res.sendStatus(400);
        }
        
        const isSuper = get(req, 'identity.super') as unknown as boolean;

        if((isSuper == false) && (authentication(user.authentication.salt, password_old) !== user.authentication.password)){
            console.log("Old password does not match");
            return res.sendStatus(400);
        }

        user.username = username;
        user.authentication.password = authentication(user.authentication.salt, password_new);
        user.email = email;

        if(img!==user.avatar){
            user.avatar = img;
        }

        await user.save();

        return res.status(200).json(user).end();

    }catch(error){
        console.log("Error on user_edit in func");
        return res.sendStatus(400);
    }
}

export const user_get = async (req:express.Request, res:express.Response) =>{
    try{

        const {id} = req.params;
        const isSuper = get(req, 'identity.super') as unknown as boolean;
        const loginId = get(req, 'identity._id') as unknown as string;

        const user = await getUserById(id);


        if(!user || !user.session){
            return res.sendStatus(400);
        }

        if(isSuper || loginId == id){
            const superuser = await getUserById(id).select('+session.token +session.date +session.ip');
            return res.status(200).json(superuser).end();
        }else{
            return res.status(200).json(user).end();
        }
        
    }catch(error){
        console.log("Error on user_get in func");
        return res.sendStatus(400);
    }
}

export const user_logout = async (req: express.Request, res:express.Response) =>{
    try{
        
        const loggedInUser = await getUserBySessionToken(req.cookies['user_auth']).select('+session.token +session.date +session.ip');


        if(!loggedInUser || !loggedInUser.session){
            return res.sendStatus(400);
        }
        const index = loggedInUser.session.token.indexOf(req.cookies['user_auth'])
        loggedInUser.session.token.splice(index, 1);
        loggedInUser.session.date.splice(index, 1);
        loggedInUser.session.ip.splice(index, 1);

        await loggedInUser.save();

        res.clearCookie('user_auth');
        return res.status(200).json(loggedInUser).end();
    }catch(error){
        console.log("Error on user_logout in func");
        return res.sendStatus(400);
    }
}

export const user_login = async (req: express.Request, res:express.Response) =>{
    try{

        const {email, password} = req.body;
        const sessiontoken = req.cookies['user_auth'];
        const salt = random();

        if(sessiontoken){
            console.log("User already logged in");
            return res.sendStatus(400);
        }

        if( !email || !password){
            return res.sendStatus(404);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password +session.token +session.date +session.ip');

        if(!user || !user.authentication || !user.authentication.salt || !user.session){
            console.log(user);
            return res.sendStatus(404);
        }

        const exprectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== exprectedHash){
            return res.sendStatus(404);
        }


            
        user.session.token.push(authentication(salt, user._id.toString()));
        user.session.date.push(new Date());
        user.session.ip.push(req.headers['x-forwarded-for'] || req.socket.remoteAddress);
    
        await user.save();
    
        res.cookie('user_auth', user.session.token, {domain:'localhost', path: '/'});
            
        return res.status(200).json(user).end();        

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const user_register = async (req: express.Request, res: express.Response) => {
    try {

        const { email, password, username, img} = req.body;

        if (!email || !password || !username){
            return res.sendStatus(400);
        }
        
        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400);
        }

        if (!process.env.IMGUR_Album_Hash) {
            return res.sendStatus(400);
        }

        let avatar = 'default';

        if(img.length>0){
            avatar = img;
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            avatar,
            super: false,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });




    return res.status(200).json(user).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}