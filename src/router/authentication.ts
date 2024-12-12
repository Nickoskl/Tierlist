import express from 'express';

import {user_login, user_register} from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/register', user_register);
    router.post('/auth/login', user_login)
};