import {DataTypes, Model} from "sequelize";
import db from "../config/db.config.js";

export default class ProductModel extends Model {}
ProductModel.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  freezeTableName: true,
  timestamps: false,
  underscored: true,
  defaultScope: {
    attributes: {
      exclude: ['user_id','userId']
    }
  },
  modelName: 'product'
});
