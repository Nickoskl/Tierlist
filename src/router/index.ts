import express from 'express';

import authentication from './authentication';
import tier_template from './tier_template';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    tier_template(router);
    return router;
};