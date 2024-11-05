const { Sequelize } = require("sequelize");

require("dotenv").config()
const { MYSQLUSER, MYSQLPASSWORD, MYSQLHOST, MYSQL_DATABASE } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQLUSER, MYSQLPASSWORD, {
  host: MYSQLHOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000, 
  }, 
});

const testConexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  } finally {
    console.log(
      "Finalizó la conexión a la base de datos en MySQL."
    );
  }
};

testConexion();

module.exports = { sequelize };