
module.exports = (Sequelize, DataTypes) => {
   
    const Truck = Sequelize.define('Truck', {

        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,


        },
        vehicleNumber: DataTypes.STRING,

    },{ timestamps: false});

    Truck.associate = models => {
        Truck.hasMany(models.Document, {as: 'documents',foreignKey:'truckId'},);
    };

    return Truck;
};