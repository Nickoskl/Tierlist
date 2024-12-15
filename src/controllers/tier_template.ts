import express from 'express';
import { get } from 'lodash';
import { getTemplateTierlists, getTemplateTierlistById, createTemplateTierlist } from '../db/tier_template';
import { list_checksum_calc } from '../helpers';

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