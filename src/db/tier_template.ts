import mongoose from 'mongoose';

const TierlistTempSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description:{ type: String, required:true},
    list_config: {
        level_table:[{type: String, required:true, select:false}],
        img_table: [{type: String, required:true, select:false}],
        list_checksum: { type: String, select: false},
    },
})

export const TierModel = mongoose.model('Tierlist', TierlistTempSchema); //CHANGE NAMING TO TEMPLATE

export const getTemplateTierlists = () => TierModel.find();
export const getTemplateTierlistByName = (searchname:string) =>{TierModel.findOne({name: searchname})};
export const getTemplateTierlistById = (t_id:string) => TierModel.findOne({_id: t_id});
export const createTemplateTierlist = (values: Record<string, any>) => new TierModel(values).save().then((tierlist) => tierlist.toObject());
export const deleteTemplateTierlistById = (t_id:string) =>TierModel.findOneAndDelete({_id: t_id});

// NOT TODO Use MongoDB for app based on 2 dimentional arrays