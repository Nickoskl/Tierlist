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

export const TierModel = mongoose.model('Tierlist', TierlistSchema); //CHANGE NAMING TO TEMPLATE

export const getTierlists = () => TierModel.find();
export const getTierlistByName = (searchname:string) =>{TierModel.findOne({name: searchname})};
export const getTierlistById = (t_id:string) => TierModel.findOne({_id: t_id});
export const createTierlist = (values: Record<string, any>) => new TierModel(values).save().then((tierlist) => tierlist.toObject());
export const deleteTierlistById = (t_id:string) =>TierModel.findOneAndDelete({_id: t_id});

// TODO Tomorrow