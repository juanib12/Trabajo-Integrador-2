const { DataTypes } = require("sequelize");
const { sequelize } = require("../conexion/database");

const Categoria = sequelize.define(
  "Categoria",
  {
    idCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categorias",
    timestamps: false,
  }
);

Categoria.associate = (models) => {
  Categoria.hasMany(models.Contenido, {
    foreignKey: "idCategoria",
    as: "contenidosPorCategoria",
  });
};

module.exports = { Categoria };
