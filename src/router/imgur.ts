import express from 'express';
import {get_img, upload_img, delete_img} from "../controllers/imgur";
import { mustBeLoggedIn , mustBeAdmin } from '../middlewares';
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export default (router: express.Router) => {
    router.get('/img/:id', get_img);
    router.post('/img/upload', upload.single('file'),  upload_img);
    router.delete('/img/:id', delete_img);
};
