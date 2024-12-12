import express from 'express';

import authentication from './authentication';
import tierlist from './tierlists';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    tierlist(router);
    return router;
};