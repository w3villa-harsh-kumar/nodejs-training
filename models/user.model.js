const { Sequelize } = require("sequelize");
const sequelize = require("../db/db.connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
    "User",
    {
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: "users",
        paranoid: true,
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
        ],
    }
);

// encrypt password before saving
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// generate auth token
User.prototype.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
            algorithm: process.env.JWT_ALGORITHM,
        }
    );
    return token;
};

// check if password matches
User.prototype.matchPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
