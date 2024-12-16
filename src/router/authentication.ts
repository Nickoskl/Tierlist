import express from 'express';
import { mustBeLoggedIn, mustBeOwnerOrAdmin, mustBeAdmin } from '../middlewares'
import {user_logout, user_login, user_register, user_get, user_edit, user_delete, users_get} from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/user/register', user_register);
    router.post('/user/login', user_login);
    router.post('/user/logout', mustBeLoggedIn, user_logout);
    router.get('/user/:id', mustBeLoggedIn, user_get);
    router.patch('/user/edit/:id', mustBeLoggedIn, mustBeOwnerOrAdmin, user_edit);
    router.delete('/user/delete/:id', mustBeLoggedIn, mustBeOwnerOrAdmin, user_delete);
    router.get('/user', mustBeLoggedIn, mustBeAdmin, users_get);
};