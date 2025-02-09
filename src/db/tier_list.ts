import mongoose from 'mongoose';

const TierlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description:{ type: String, required:true},
    template: { type: String, required:true},
    created: { type: Date, required:true},
    by: { type: String, required:true},
    last_edit: { type: Date, required:true},
    list_config: {
        placement:[{type: String, required:true, select:false}],
        list_checksum: { type: String, select: false},
    },
})

export const TierModel = mongoose.model('Tierlist', TierlistSchema); //CHANGE NAMING TO TEMPLATE

export const getTierlists = () => TierModel.find();
export const getTierlistsByTemplate = (template_id:string) => TierModel.find({template: template_id});
export const getTierlistByName = (searchname:string) =>TierModel.findOne({name: searchname});
export const getTierlistById = (t_id:string) => TierModel.findById(t_id);
export const createTierlist = (values: Record<string, any>) => new TierModel(values).save().then((tierlist) => tierlist.toObject());
export const deleteTierlistById = (t_id:string) =>TierModel.findOneAndDelete({_id: t_id});