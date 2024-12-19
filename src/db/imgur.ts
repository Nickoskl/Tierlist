import mongoose from 'mongoose';

const ImgurDBSchema = new mongoose.Schema({
    username: {type: String, required: true },
});

export const ImgurModel = mongoose.model('Imgur', ImgurDBSchema);

export const getUsers = () => ImgurModel.find();
