import Sequelize from "sequelize";
import { sequelize } from "../start";
// import uuid from "node-uuid";

let User = sequelize.define("user", {
  guid: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true,
  },
  name: Sequelize.STRING,
  displayName: Sequelize.STRING,
},
{
  freezeTableName: true, // Model tableName will be the same as the model name,
});

export default User;
