const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: {
        max: Number(dbConfig.pool.max),
        min: Number(dbConfig.pool.min),
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// test the connection
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((err) => {
//         console.error("Unable to connect to the database:", err);
//         process.exit(1);
//     });

module.exports = sequelize;
