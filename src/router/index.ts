import express from 'express';

import authentication from './authentication';
import tier_template from './tier_template';
import tier_list from './tier_list';
import imgur from './imgur';

const router = express.Router();

export default (): express.Router => {
    router.use((req, res, next) => {
        console.log(req.headers['x-forwarded-for'] || req.socket.remoteAddress +  "Requested "+ req.path);
        next();
    });
    authentication(router);
    tier_template(router);
    tier_list(router);
    imgur(router);
    return router;
};