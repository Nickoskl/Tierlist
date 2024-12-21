import express from 'express';
import {tier_template_create, template_list, tier_template_get, tier_template_delete} from '../controllers/tier_template';
import {get_img} from "../controllers/imgur";
import { mustBeLoggedIn , mustBeAdmin } from '../middlewares';

export default (router: express.Router) => {
    router.post('/template/create',mustBeLoggedIn, mustBeAdmin, tier_template_create);
    router.get('/template', template_list);
    router.get('/template/:id',mustBeLoggedIn, tier_template_get);
    router.delete('/template/delete/:id', mustBeLoggedIn, mustBeAdmin, tier_template_delete)
    router.get('/img/:id.png', get_img);
};
