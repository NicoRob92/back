const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
     
      },       
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notNull: { msg: "field is required" },
        len:{
          args:[4,20],
          msg:"must have a min length of 4 chars"
        }
      },
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notNull: { msg: "field is required" },
        len:{
          args:[20,250],
          msg:"must have a min length of 20 chars, max length 250 chars"
        }
      },
    },
    released:{
      type:DataTypes.STRING, 
      allowNull:false,
      validate: {
        notNull: { msg: "field is required" },
      }, 
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: { msg: "field is required" },
      },
    },
    background_image:{
      type:DataTypes.TEXT,
    }
  },{timestamps:false});
};
