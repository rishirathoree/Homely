import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    id: {type: Number,required:true},
    parentId:{type: Number,required:true},
    images:{type:Array,required:true},
    name:{type:String,required:true},
    active:{type: Number,required:true,default:0},
    description:{type:String,required:true},
    home_section_id:{type: Number,default:0},
})

const Category = new model('Category',CategorySchema)

export default Category