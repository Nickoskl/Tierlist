import express from 'express';
import {tier_template_register, template_list, tier_template} from '../controllers/tier_template';

export default (router: express.Router) => {
    router.post('/list/create', tier_template_register);
    router.get('/list/', template_list);
    router.get('/list-:id/', tier_template);
};

// TODO Better Router