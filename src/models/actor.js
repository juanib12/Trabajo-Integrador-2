const { DataTypes } = require("sequelize");
const { sequelize } = require("../conexion/database");

const Actor = sequelize.define(
  "Actor",
  {
    idActor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "actores",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["nombre", "apellido"], 
      },
    ],
  }
);

Actor.associate = (models) => {
  Actor.belongsToMany(models.Contenido, {
    through: "contenido_actores", 
    foreignKey: "idActor",
    otherKey: "idContenido",
    as: "contenidosPorActor",
    timestamps: false,
  });
};

module.exports = { Actor };
