import mongoose from 'mongoose';

const ImgurDBSchema = new mongoose.Schema({
    id: {type: String, required: true },
    imgur: {type: String, required:true},
    ext: {type: String, required:true},
    deletehash: {type: String, required:true}
});

export const ImgurModel = mongoose.model('Imgur', ImgurDBSchema);

export const getImgById = (url_id:Number) => ImgurModel.findOne({id: url_id});
export const createImgUpload = (values: Record<string, any>) => new ImgurModel(values).save().then((img) => img.toObject());
export const deleteImgById = (url_id:String) => ImgurModel.findOneAndDelete({id: url_id});
