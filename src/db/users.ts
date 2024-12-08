import mongoose from 'mongoose';

const UserSchema = new mongoose. Schema({
    username: {type: String, required: true},
    email:{ type: String, required:true},
    authentication: {
        password:{type: String, required:true, select:false},
        salt: {type: String, select: false},
        sessionToken: { type: String, select: false},
    },
})

const TierlistSchema = new mongoose. Schema({
    name: {type: String, required: true},
    description:{ type: String, required:true},
    list_config: {
        password:{type: String, required:true, select:false},
        salt: {type: String, select: false},
        sessionToken: { type: String, select: false},
    },
})


export const TierModel = mongoose.model('Tierlist', TierlistSchema);
export const UserModel = mongoose.model('User', UserSchema);

export const getTierlists = () => TierModel.find();
export const getTierlistByName = (searchname:string) =>{TierModel.findOne({searchname})};
export const createTierlist = (values: Record<string, any>) => new TierModel(values).save().then((tierlist) => tierlist.toObject());
export const deleteTierlist = (t_id:number) =>{TierModel.findOneAndDelete({_id: t_id})};

export const getUsers = () => UserModel.find();
export const getUserBySessionToken = (u_token:number) =>{UserModel.findOne({'authentication.sessionToken': u_token,})};
export const getUserById = (u_id:number) =>{UserModel.findById(u_id)};
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (u_id:number) =>{UserModel.findOneAndDelete({_id: u_id})};
