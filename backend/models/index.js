import UserModel from "./user.model.js";
import ProductModel from "./product.model.js";

UserModel.hasMany(ProductModel)

ProductModel.belongsTo(UserModel)

export {UserModel, ProductModel}