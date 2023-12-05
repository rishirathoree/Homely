import { Router } from "express";
import {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
} from "../Controller/Category.js";
import upload from "../middlewares/multer-config.js";

const router = Router();

router
  .post("/", upload.array("images", 4), CreateCategory)
  .get("/", GetCategories)
  .put("/", upload.array('images',4), UpdateCategory)
  .delete("/:id", upload.single(), DeleteCategory);

export default router;
