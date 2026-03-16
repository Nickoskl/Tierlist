import express from 'express';
import { mustBeLoggedIn, mustBeOwnerOrAdmin_Assets } from '../middlewares';
import { tier_list_delete, tier_list_create, tier_list_get, tier_lists, tier_list_update, tier_list_user_get} from '../controllers/tier_list';

export default (router: express.Router) => {
    router.post('/tierlist/create', mustBeLoggedIn, tier_list_create);
    router.get('/tierlist', tier_lists);
    router.get('/tierlist/by/:id', tier_list_user_get);
    router.get('/tierlist/:id', tier_list_get);
    router.patch('/tierlist/edit/:id', mustBeLoggedIn, mustBeOwnerOrAdmin_Assets, tier_list_update);
    router.delete('/tierlist/delete/:id', mustBeLoggedIn, mustBeOwnerOrAdmin_Assets, tier_list_delete)
};