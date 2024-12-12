import express from 'express';
import { getTierlistByName, createTierlist } from '../db/tierlists';
import { list_checksum_calc } from '../helpers';

export const list = async (req: express.Request, res: express.Response) =>{
    // ##TODO
}

export const list_register = async (req: express.Request, res: express.Response) => {
    try {

        const { name, description, level_table, img_table } = req.body;

        if (!name || !description || !level_table || !img_table){
            console.log(req.body);
            return res.sendStatus(400);
        }

        const list = await createTierlist({
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