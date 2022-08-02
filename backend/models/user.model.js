import {DataTypes, Model} from "sequelize";
import db from "../config/db.config.js";

export default class UserModel extends Model {
}
UserModel.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Mohon periksa alamat email anda"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  freezeTableName: true,
  timestamps: false,
  underscored: true,
  // defaultScope: {
  //   attributes: {
  //     exclude: ['password']
  //   }
  // },
  modelName: 'user'
});