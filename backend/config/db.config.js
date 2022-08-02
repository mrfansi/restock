import {Sequelize} from "sequelize";

const db = new Sequelize('restock', 'root', 'gwsudahbahagia', {
  host: 'localhost',
  port: 3307,
  dialect: 'mariadb'
});

export default db;