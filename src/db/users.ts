import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true },
    email:{ type: String, required:true },
    lists:{ type: Array },
    super:{ type: Boolean, required: true },
    authentication: {
        password:{type: String, required:true, select:false},
        salt: {type: String, select: false},
    },
    session:{
        token: { type: Array, select: false},
        date: { type: Array, select: false},
        ip: { type: Array, select: false}
    }
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (u_email:string) => UserModel.findOne({ email: u_email});
export const getUserBySessionToken = (u_token:string) => UserModel.findOne({'session.token': u_token,});
export const getUserById = (u_id:string) =>UserModel.findById({_id: u_id});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (u_id:string) =>UserModel.findOneAndDelete({_id: u_id});
