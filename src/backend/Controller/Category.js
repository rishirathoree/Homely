import Category from "../Model/Categories.js";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
import fs from 'fs'

export const CreateCategory = async (req, res) => {
  const { action } = req.body;

  if (!action) {return res.status(200).json({ success: 0, actionError: "Action Not Defined" });}

  if (action === "add_category") {

    console.log(req.files,req.body)

    const { active,name, description } = req.body;

    if (
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(200).json({ imageError: "Image Not Defined", success: 0 });
    }

    try {

      const images =
        req.files.length > 0 &&
        req.files.map((file) => ({
          filename: file.filename,
          originalname: `http://${process.env.PORT_URL}:${process.env.PORT}/images/${file.filename}`,
        }));

      const categories = await Category.find();

      const createCtg = await new Category({
        id:categories.length > 0 ? categories[categories.length - 1].id + 1 : categories.length + 1,
        images,
        description,
        name,
        parentId : 0,
        active,
        home_section_id:0,
      });

      await createCtg.save();

      return res.status(200).json({ msg: "successfully category created", success: 1 });
    } catch (error) {
      console.log(error.name)
      if (error.name === "ValidationError") {
        return res
          .status(200)
          .json({ msg: "Validation error", errors: error.errors, success: 0 });
      }
      return res.status(200).json({ msg: "Internal Server Error", success: 0 });
    }
  }

  if (action === "add_subcategory") {
    try {
      const { parentId, home_section_id, name, description } = req.body;
    
      console.log(req.files)

      if (
        !req.files ||
        req.files.length === 0
      ) {
        return res.status(200).json({ imageError: "Image Not Defined", success: 0 });
      }

      console.log('running', req.body)

      if (parentId == 0) {return res.status(400).json({msg: "Can't add the subcategory with the given parentId",success: 0,});}

      const images = req.files.length > 0 && req.files.map((file) => ({filename: file.filename,originalname: `http://${process.env.PORT_URL}:${process.env.PORT}/images/${file.filename}`,}));

        const CategoriesAvail = await Category.find()

      const NewSubCtgCreating = new Category({
        id:CategoriesAvail[CategoriesAvail.length - 1].id + 1,
        parentId,
        home_section_id,
        name,
        description,
        images,
      });

      await NewSubCtgCreating.save();

      return res.status(200).json({msg:'Subcategory Created Successfully',success:1})
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(200)
          .json({ msg: "Validation error", errors: error.errors, success: 0 });
      }
      return res.status(500).json({ msg: "Internal Server Error", success: 0 });
    }
  }

};

export const GetCategories = async (req, res) => {

  const {action} = req.query

  if(!action){return res.status(200).json({msg:'action not defined to get main ctg / subctg',success:0})}
  
  if(action === 'GET_SUBCATEGORIES'){

    const { ORDER_BY, ROW_COUNT, PAGE, SEARCH,date_from,date_to } = req.query;

    let query = {
      parentId: { $ne: 0 },
    };

    if (SEARCH && SEARCH.length > 0) {
      query.$or = [
        { name: SEARCH },
        { parentId: parseInt(SEARCH) || 0 },
        { description: { $regex: new RegExp(SEARCH, 'i') } }
      ];
    } 

    const Subcategories = await Category.find(query);
    
    const sortOrder = ORDER_BY === 'ASC' ? -1 : 1;

    const skipCount = (PAGE - 1) * parseInt(ROW_COUNT);

    try {

      const FSubcategories = await Category.find(query)
      .skip(skipCount)
      .limit(parseInt(ROW_COUNT))
      .sort({ id: sortOrder })
      .exec()

      const subcategoriesWithParentName = await Promise.all(
        FSubcategories.map(async (subcategory) => {
          const parent = await Category.findOne({ id: subcategory.parentId });
          return {
            ...subcategory.toObject(),
            categoryName: parent ? parent.name : null,
          };
        })
      );

      res.status(200).json({ success: 1, categories:subcategoriesWithParentName, count:Subcategories.length });
    } catch (error) {
      res.status(200).json({ success: 0, msg:'cannot able to give the product sub ctg' });
    }
  }

  if(action === 'GET_CATEGORIES'){

    const { ORDER_BY, ROW_COUNT, PAGE, SEARCH,date_from,date_to } = req.query;

    let query = {
      parentId: { $eq: 0 },
    };

    if (SEARCH && SEARCH.length > 0) {
      query.$or = [
        { name: SEARCH },
        { parentId: parseInt(SEARCH) || 0 },
        { description: { $regex: new RegExp(SEARCH, 'i') } }
      ];
    } 

    const categories = await Category.find(query);
    
    const sortOrder = ORDER_BY === 'ASC' ? -1 : 1;

    const skipCount = (PAGE - 1) * parseInt(ROW_COUNT);

    try {

      const Fcategories = await Category.find(query)
      .skip(skipCount)
      .limit(parseInt(ROW_COUNT))
      .sort({ id: sortOrder })
      .exec()
      

      res.status(200).json({ success: 1, categories:Fcategories, count:categories.length });
    } catch (error) {
      res.status(200).json({ success: 0, msg:'cannot able to give the product sub ctg' });
    }
  }

};

export const UpdateCategory = async(req,res) => {
  const {action} = req.body

  if(!action){return res.status(200).json({msg:'action is not defined',success:0})}

  if(action === 'update_category_status'){

    const { id } = req.body
    
    try {

      const findCatgeory = await Category.findOne({id})

      if(!findCatgeory){return res.status(200).json({msg:'catgeory not found,not getting the valid catgeory id',success:0})}

      findCatgeory.active = findCatgeory.active === 1 ? 0 : 1
      
      await findCatgeory.save()

      return res.status(200).json({msg:`Updated ${findCatgeory.name} catgeory with new status`,success:1})
      
    } catch (error) {

      return res.json(200).json({msg:'Not getting the required fields'})

    }
  }

  if(action === 'update_category'){
    console.log(req.files)
  }
}

export const DeleteCategory = async (req, res) => {

  const {id} = req.params
  
  if(!id){return res.status(200).json({msg:'Category Id Not Defined'})}

  try {

    const findCatgeory = await Category.findOne({id})

    if(!findCatgeory){return res.status(200).json({msg:'Category ID is not defined which you provided'})}

    const uploadFolderPath = path.join(__dirname, "../uploads")

    const imagePath = path.join(uploadFolderPath,findCatgeory.images[0].filename)

    fs.readFile(imagePath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.log('fileReadErr not found',);
      } else {
        console.log('File content:');

        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.log('delete err');
          } else {
            console.log('File deleted successfully');
          }
        });
      }
    });
    
    await Category.deleteOne({id});

    return res.status(200).json({ msg: `Category ${findCatgeory.name} successfully deleted`, success: 1 });

  } catch (error) {

    console.error(error);
    
    return res.status(200).json({ msg: 'Internal Server Error', success: 0 });
  }
};
