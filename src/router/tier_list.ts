import express from 'express';
import { mustBeLoggedIn, mustBeOwnerOrAdmin } from '../middlewares';
import { tier_list_delete, tier_list_create, tier_list_get, tier_lists, tier_list_update} from '../controllers/tier_list';

export default (router: express.Router) => {
    router.post('/tierlist/create', mustBeLoggedIn, tier_list_create);
    router.get('/tierlist', tier_lists);
    router.get('/tierlist/:id', mustBeLoggedIn, tier_list_get);
    router.patch('/tierlist/edit/:id', mustBeLoggedIn, mustBeOwnerOrAdmin, tier_list_update);
    router.delete('/tierlist/delete/:id', mustBeLoggedIn, mustBeOwnerOrAdmin, tier_list_delete)
};