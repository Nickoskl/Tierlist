import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

export const user_login = async (req: express.Request, res:express.Response) =>{
    try{

        const {email, password} = req.body;

        if( !email || !password){
            return res.sendStatus(404);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user || !user.authentication || !user.authentication.salt){
            console.log(user);
            return res.sendStatus(404);
        }

        const exprectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== exprectedHash){
            return res.sendStatus(404);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('APP-AUTH', user.authentication.sessionToken, {domain:'localhost', path: '/'});
        return res.status(200).json(user).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const user_register = async (req: express.Request, res: express.Response) => {
    try {

        const { email, password, username } = req.body;

        if (!email || !password || !username){
            return res.sendStatus(400);
        }
        
        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
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