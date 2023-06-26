module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define(
        "Task",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM,
                values: ["pending", "ongoing", "completed"],
                defaultValue: "pending",
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "tasks",
            paranoid: true,
            timestamps: true,
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
            ],
        }
    );

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    };

    return Task;
};
