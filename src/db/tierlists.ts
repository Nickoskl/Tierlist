import mongoose from 'mongoose';

const TierlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description:{ type: String, required:true},
    list_config: {
        password:{type: String, required:true, select:false},
        salt: {type: String, select: false},
        sessionToken: { type: String, select: false},
    },
})

export const TierModel = mongoose.model('Tierlist', TierlistSchema);

export const getTierlists = () => TierModel.find();
export const getTierlistByName = (searchname:string) =>{TierModel.findOne({searchname})};
export const createTierlist = (values: Record<string, any>) => new TierModel(values).save().then((tierlist) => tierlist.toObject());
export const deleteTierlist = (t_id:number) =>{TierModel.findOneAndDelete({_id: t_id})};