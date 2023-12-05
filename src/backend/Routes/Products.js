import { Router } from "express";
import {
  CreateNewProduct,
  GetProducts,
  GetSingleProduct,
  UpdateProducts,
} from "../Controller/Products.js";
import { CheckAuthTokenMiddleware, checkRoles } from "../Controller/Auth.js";
import upload from "../middlewares/multer-config.js";

const router = Router();

router
  .get("/Products", CheckAuthTokenMiddleware, GetProducts)
  .get("/:ProductId", CheckAuthTokenMiddleware, GetSingleProduct)
  .put("/Products", CheckAuthTokenMiddleware, upload.none() ,UpdateProducts)
  .post('/Products',CheckAuthTokenMiddleware,checkRoles(['admin','subadmin']),upload.array('images',4),CreateNewProduct)
export default router;