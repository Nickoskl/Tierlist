import express from 'express';

import authentication from './authentication';
import tier_template from './tier_template';
import tier_list from './tier_list';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    tier_template(router);
    tier_list(router);
    return router;
};