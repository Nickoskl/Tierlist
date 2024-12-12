import express from 'express';
import {list_register, list} from '../controllers/tierlists';

export default (router: express.Router) => {
    router.post('/list/create', list_register);
    router.get('/list/', list)
};