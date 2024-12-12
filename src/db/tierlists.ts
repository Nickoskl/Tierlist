import mongoose from 'mongoose';

const TierlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description:{ type: String, required:true},
    list_config: {
        level_table:[{type: String, required:true, select:false}],
        img_table: [{type: String, required:true, select:false}],
        list_checksum: { type: String, select: false},
    },
})

export const TierModel = mongoose.model('Tierlist', TierlistSchema);

export const getTierlists = () => TierModel.find();
export const getTierlistByName = (searchname:string) =>{TierModel.findOne({name: searchname})};
export const createTierlist = (values: Record<string, any>) => new TierModel(values).save().then((tierlist) => tierlist.toObject());
export const deleteTierlist = (t_id:string) =>{TierModel.findOneAndDelete({_id: t_id})};

// NOT TODO Use MongoDB for app based on 2 dimentional arrays