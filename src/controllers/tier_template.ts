import express from 'express';
import { get } from 'lodash';
import { getTemplateTierlists, getTemplateTierlistById, createTemplateTierlist, deleteTemplateTierlistById } from '../db/tier_template';
import { getTierlistsByTemplate, deleteTierlistById } from '../db/tier_list';
import { list_checksum_calc } from '../helpers';


export const tier_template_delete = async (req:express.Request, res:express.Response) =>{
    try{

        const {id} = req.params;

        const tierlists = await getTierlistsByTemplate(id).select('+_id');

        if(!tierlists){
            return res.sendStatus(400);
        }
        
        tierlists.forEach(async tierlist => {
            await deleteTierlistById(tierlist._id as unknown as string);
        });

        const tier_temp = await deleteTemplateTierlistById(id);

        return res.json(tier_temp);
            
    }catch(error){
        console.log("Error on tier_template_delete in func");
        return res.sendStatus(400);
    }
}


export const tier_template_get = async (req:express.Request, res: express.Response,) => {
    
    try{

    const {id} = req.params;

    if(!id){
        return res.sendStatus(400);
    }
    
    const list = await getTemplateTierlistById(id).select('+list_config.level_table +list_config.img_table +list_config.list_checksum');
    if (!list || !list.list_config || !list.list_config.level_table){
        return res.sendStatus(400);
    }
    console.log(list.list_config.level_table.length);
    return res.status(200).json(list).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
    
}

export const template_list = async (req: express.Request, res: express.Response) =>{
    const list = await getTemplateTierlists();
    return res.status(200).json(list).end();
}

export const tier_template_create = async (req: express.Request, res: express.Response) => {
    try {

        const { name, description, level_table, img_table } = req.body;

        const loggedInUserEmail = get(req, 'identity.email') as unknown as string;

        if (!name || !description || !level_table || !img_table || !loggedInUserEmail){
            console.log(req.body);
            return res.sendStatus(400);
        }

        const template = await createTemplateTierlist({
            name,
            description,
            created: new Date(),
            list_config: {
                level_table,
                img_table,
                list_checksum: list_checksum_calc(img_table, level_table, loggedInUserEmail),
            },
        });

    return res.status(200).json(template).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}