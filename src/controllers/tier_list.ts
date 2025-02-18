import express from 'express';
import { get } from 'lodash';
import { createTierlist, deleteTierlistById, getTierlistById, getTierlists, } from '../db/tier_list';
import { getTemplateTierlistById } from '../db/tier_template';
import { list_checksum_calc } from '../helpers';
import { getUserById } from '../db/users';

export const tier_list_delete = async (req:express.Request, res:express.Response) =>{
    try{

        const {id} = req.params;

        const tierlist = await deleteTierlistById(id);

        return res.json(tierlist);

    }catch(error){
        console.log("Error on tier_list_delete in func");
        return res.sendStatus(400);
    }
}

export const tier_list_update = async (req:express.Request, res:express.Response) => {
    try{

        const {id} = req.params;
        const {name, description,background, placement} = req.body;

        const tierlist = await getTierlistById(id).select('+list_config.placement');

        if(!id || !tierlist || !tierlist.name || !tierlist.list_config || !name || !description || !background || !placement){
            return res.sendStatus(400);
        }

        if (tierlist.list_config.placement.length !== placement.length){
            console.log('Tierlist update length does not match previous length');
            return res.sendStatus(400);
        }
        
        tierlist.name = name;
        tierlist.description = description;
        tierlist.background = background;
        tierlist.list_config.placement = placement;
        tierlist.last_edit = new Date();

        await tierlist.save();

        console.log(tierlist);
        return res.status(200).json(tierlist).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const tier_lists = async (req:express.Request, res:express.Response) =>{
    try{

        const list = await getTierlists();
        return res.status(200).json(list).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const tier_list_get = async (req:express.Request, res:express.Response) =>{
    try{
        const {id} = req.params;

        if(!id){
            return res.sendStatus(400);
        }
        
        const list = await getTierlistById(id).select('+list_config.placement +list_config.list_checksum');
        return res.status(200).json(list).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const tier_list_create = async (req: express.Request, res: express.Response) =>{
    
    try{
        const {name, description, template, placement, background} = req.body;

        const loggedInUserEmail = get(req, 'identity.email') as unknown as string;
        const loggedInUserName = get(req, 'identity.name') as unknown as string;
        const loggedInId = get(req, 'identity._id') as unknown as string;

        const templateFromDB = await getTemplateTierlistById(template).select('+list_config.level_table');
        const userFromDB = await getUserById(loggedInId);


        if (!name || !description || !template || !background || !placement || !loggedInUserEmail || !templateFromDB || !templateFromDB.name || !templateFromDB.list_config ||!userFromDB){
            return res.sendStatus(400);
        }

        if (templateFromDB.list_config.level_table.length !== placement.length){
            console.log('Tierlist length does not match template length');
            return res.sendStatus(400);
        }

        

        const tierlist_name:string = templateFromDB.name + " - " + name;

        const tierlist = await createTierlist({
            name: tierlist_name,
            description,
            template,
            created: new Date(),
            by: loggedInUserName,
            last_edit: new Date(),
            list_config: {
                placement: placement,
                list_checksum: list_checksum_calc(placement, tierlist_name, loggedInUserEmail)
            }
        });

        userFromDB.lists.push(tierlist._id);

        await userFromDB.save();

        return res.status(200).json(tierlist).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }   
}