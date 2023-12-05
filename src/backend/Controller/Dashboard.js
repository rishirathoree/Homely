import Category from "../Model/Categories.js";
import Users from "../Model/CreateNewUser.js";
import Product from "../Model/Products.js";

export const DashboardAbt = async (req, res) => {
  const totalProducts = await Product.find();
  const totalCategories = await Category.find();
  const totalAccounts = await Users.find();
  return res
    .status(200)
    .json({
      msg: "dashboard information",
      totals: {
        catgeoriesTotal: totalCategories.length,
        productTotal: totalProducts.length,
        UsersTotal:totalAccounts.length
      },
    });
};
