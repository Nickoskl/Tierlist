import mongoose from 'mongoose';

const ImgurDBSchema = new mongoose.Schema({
    id: {type: String, required: true },
    imgur: {type: String, required:true},
    ext: {type: String, required:true}
});

export const ImgurModel = mongoose.model('Imgur', ImgurDBSchema);

export const getImgById = (url_id:String) => ImgurModel.findOne({id: url_id});
