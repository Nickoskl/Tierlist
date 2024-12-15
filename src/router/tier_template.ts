import express from 'express';
import {tier_template_create, template_list, tier_template_get} from '../controllers/tier_template';
import { mustBeLoggedIn } from '../middlewares';

export default (router: express.Router) => {
    router.post('/template/create',mustBeLoggedIn, tier_template_create);
    router.get('/template', template_list);
    router.patch('/template/:id',mustBeLoggedIn, tier_template_get);
};
