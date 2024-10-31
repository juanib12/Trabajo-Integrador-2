const { DataTypes } = require("sequelize");
const { sequelize } = require("../conexion/database");

const Genero = sequelize.define(
  "Genero",
  {
    idGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "generos",
    timestamps: false,
  }
);

Genero.associate = (models) => {
  Genero.belongsToMany(models.Contenido, {
    through: "contenido_generos", 
    foreignKey: "idGenero",
    otherKey: "idContenido",
    as: "contenidosPorGenero",
    timestamps: false,
  });
};

module.exports = { Genero };
