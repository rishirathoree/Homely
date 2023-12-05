import { Schema, model } from "mongoose";

const productSchema = new Schema({
    id: {type: Number,required:true},
    name: {type: String,default: "",required:true},
    description: {type: String,default: "",required:true},
    images: {type: Array,default: [],required:true},
    active: {type: Number,default: 1,},
    category_id: {type: String,default: "",},
    category_Name: {type: String,default: "",},
    brand_name: {type: String,default: "",},
    brand_id: {type: String,default: "",},
    enabled: {type: Number,default: 0,},
    offer_id: {type: String,default: "",},
    home_section_id: {type: String,default: "",},
    is_trending: {type: Number,default: 0,},
    is_best_deal: {type: Number,default: 0,},
    suggested_of: {type: String,default: "",},
    recommended_product: {type: Number,default: 0,},
    tax: {type: Number,default: 0,},
    order_by: {type: Number,default: 0,},
    sku_value: {type: String,default: "",},
    out_of_stock_action: {type: Number,default: 0,},
    feature_values: {type: Array,default: [],},
}, { timestamps: true });

const Product = new model('Products', productSchema);

export default Product;
