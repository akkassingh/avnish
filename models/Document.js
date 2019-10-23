const driver =  require("./Driver");
module.exports = (Sequelize, DataTypes) => {
    const Document = Sequelize.define('Document', {

        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        documentId: DataTypes.STRING,

        type: {
            type: DataTypes.ENUM,
            values: ['License', 'Permit']
        },
        issueDate: DataTypes.DATE,
        expiryDate: DataTypes.DATE,
        imageUrl: DataTypes.STRING

    },{ timestamps: false});

    Document.associate = models => {
        Document.belongsTo(models.Driver, {
            as: 'driver'
        });
    };

    return Document;
};