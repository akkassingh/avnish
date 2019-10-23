
module.exports = (Sequelize, DataTypes) => {
   
    const Driver = Sequelize.define('Driver', {

        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,


        },
        name: DataTypes.STRING,

    },{ timestamps: false});

    Driver.associate = models => {
         Driver.hasMany(models.Document, {as: 'documents',foreignKey:'driverId'},);
    };

    return Driver;
};