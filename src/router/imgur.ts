import express from 'express';
import {get_img, upload_img, delete_img,update_img} from "../controllers/imgur";
import { mustBeLoggedIn, mustBeOwnerOrAdmin_Assets , mustBeAdmin } from '../middlewares';
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export default (router: express.Router) => {
    router.get('/img/:id', get_img);
    router.post('/img/upload',mustBeLoggedIn , upload.single('file'),  upload_img);
    router.patch('/img/:id',mustBeLoggedIn,  update_img);
    router.delete('/img/:id',mustBeLoggedIn, mustBeOwnerOrAdmin_Assets, delete_img);
};
