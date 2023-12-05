import Product from '../Model/Products.js'
import Users from '../Model/CreateNewUser.js'

import dotenv from 'dotenv'
dotenv.config()

export const GetProducts = async (req, res) => {

  const { ORDER_BY, ROW_COUNT, PAGE, search,date_from,date_to } = req.query;

  try {
    let query = {};

    if (search && search.length > 0) {
      query = {
        $or: [
          { name: { $regex: new RegExp(search, 'i') } },
          { id: parseInt(search) || 0 },
          { brand_name: { $regex: new RegExp(search, 'i') } || 0 },
          { category_Name: { $regex: new RegExp(search, 'i') } || 0 },
        ],
      };
    }
    
    if (date_from && date_to) {
      const startOfDay = new Date(date_from);
      const endOfDay = new Date(date_to);
      endOfDay.setHours(23, 59, 59, 999);
    
      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    // for getting the length
    const totalProd = await Product.find(query);

    const sortOrder = ORDER_BY === 'ASC' ? -1 : 1;

    const skipCount = (PAGE - 1) * parseInt(ROW_COUNT);

    const FProducts = await Product.find(query)
      .skip(skipCount)
      .limit(parseInt(ROW_COUNT))
      .sort({ id: sortOrder })
      .exec();

    return res.status(200).json({
      products: FProducts,
      success: 1,
      numberOfProducts: totalProd.length,
    });
  } catch (error) {
    return res.status(200).json({ success: 0, msg: 'Internet error' });
  }
};

export const GetSingleProduct = async (req,res) => {

  const { ProductId } = req.params
  
  try {
    const findProduct = await Product.findOne({id:ProductId})
    
    if(!findProduct){return res.status(200).json({msg:'no found',success:0})}
    
    return res.status(200).json({msg:'success',success:1,Product:findProduct})
    
  } catch (error) {
    return res.status(200).json({ sucess: 0, msg: "internet error" });
  }
}

export const CreateNewProduct = async (req, res) => {

  const {action_type,active,category_id,is_trending,is_best_deal,name,description,enabled,out_of_stock_action,category_Name,feature_values,brand_name} = req.body;
  
  if (!action_type) {
    return res.status(400).json({ msg: 'action_type is not defined', success: 0 });
  }
  if (action_type === 'add_product') {
    try {
      const dbProducts = await Product.find()

      const images = req.files.map((file) => ({ filename: file.filename, originalname: `http://${process.env.PORT_URL}:${process.env.PORT}/images/${file.filename}` }));
      
      const productNew = new Product({
        id: dbProducts.length + 1,
        name,
        description,
        images,
        active,
        brand_name,
        category_id,
        category_Name,
        enabled,
        out_of_stock_action,
        is_trending,
        is_best_deal,
        feature_values,
      });
      await productNew.save();

      return res.status(200).json({ msg: 'Product added successfully', success: 1});

    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Validation error', errors: error.errors, success: 0 });
      }
      return res.status(500).json({ msg: 'Internal Server Error', success: 0 });
    }
  }
  
  else {
    return res.status(400).json({ msg: 'Invalid action_type', success: 0 });
  }
};

export const UpdateProducts = async(req,res) => {
  
  const {action_type} = req.body
  if (!action_type) {
    return res.status(400).json({ msg: 'action_type is not defined', success: 0 });
  }

  // toggling the status
  if(action_type === 'update_status'){

    const {Product_Id} = req.body

    const ProductMod = await Product.findOne({id:Product_Id})

    if(!ProductMod){return res.status(200).json({Error:'Invalid Product Id'})}

    ProductMod.active = ProductMod.active === 1 ? 0 : 1

    await ProductMod.save()

    return res.status(200).json({success:1,message:'User Toggled Successfully'})
  }

}

