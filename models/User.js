
module.exports = (Sequelize, DataTypes) => {
   
    const Users = Sequelize.define('users', {

        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        accessType : {
            type: DataTypes.STRING,
            required: true
        }
    },{ timestamps: true});

    return Users;
};