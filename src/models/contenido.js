const { DataTypes } = require("sequelize");
const { sequelize } = require("../conexion/database");

const Contenido = sequelize.define(
  "Contenido",
  {
    idContenido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resumen: {
      type: DataTypes.TEXT,
    },
    temporadas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duracion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    trailer: {
      type: DataTypes.STRING(255),
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "categorias", 
        key: "idCategoria",
      },
      onUpdate: "CASCADE", 
      onDelete: "SET NULL", 
    },
  },
  {
    tableName: "contenido",
    timestamps: false,
  }
);

Contenido.associate = (models) => {
  Contenido.belongsTo(models.Categoria, {
    foreignKey: "idCategoria",
    as: "categoria",
  });

  Contenido.belongsToMany(models.Genero, {
    through: "contenido_generos",
    foreignKey: "idContenido",
    otherKey: "idGenero", 
    as: "generos", 
    timestamps: false, 
  });

  Contenido.belongsToMany(models.Actor, {
    through: "contenido_actores",
    foreignKey: "idContenido",
    otherKey: "idActor",
    as: "actores", 
    timestamps: false,
  });
};

module.exports = { Contenido };
