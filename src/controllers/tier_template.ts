import express from 'express';
import { getTemplateTierlists, getTemplateTierlistByName, getTemplateTierlistById, createTemplateTierlist } from '../db/tier_template';
import { list_checksum_calc } from '../helpers';

export const tier_template = async (req:express.Request, res: express.Response,) => {
    
    try{

    const {id} = req.params;

    if(!id){
        return res.sendStatus(400);
    }
    
     const list = await getTemplateTierlistById(id).select('+list_config.level_table +list_config.img_table +list_config.list_checksum');
    return res.status(200).json(list).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
    
}

export const template_list = async (req: express.Request, res: express.Response) =>{
    const list = await getTemplateTierlists().select('+list_config.level_table +list_config.img_table +list_config.list_checksum');
    return res.status(200).json(list).end();
}

export const tier_template_register = async (req: express.Request, res: express.Response) => {
    try {

        const { name, description, level_table, img_table } = req.body;

        if (!name || !description || !level_table || !img_table){
            console.log(req.body);
            return res.sendStatus(400);
        }

        const list = await createTemplateTierlist({
            name,
            description,
            list_config: {
                level_table,
                img_table,
                list_checksum: list_checksum_calc(img_table, level_table),
            },
        });

    return res.status(200).json(list).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}