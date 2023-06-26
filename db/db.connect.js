const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const logger = require("../loggers/index.js");

const sequelize = new Sequelize(
    process.env.NODE_ENV === "test" ? dbConfig.TEST_DB : dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.PORT,
        logging: (msg) => {
            logger.debug(msg);
        },
        pool: {
            max: Number(dbConfig.pool.max),
            min: Number(dbConfig.pool.min),
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
);

// test the connection
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((error) => {
//         console.error("Unable to connect to the database:", error);
//         process.exit(1);
//     });

module.exports = sequelize;
