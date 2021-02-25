module.exports = function(sequelize, DataTypes) {
    let Cards = sequelize.define("Cards", {
        card_id: {
            type: DataTypes.INT,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.String,
            allowNull: false,
            validate: {
                len: [1, 50]
            },
        },
        term: {
            type: DataTypes.TEXT, 
            allowNull: false,
        }, 
        definition: {
            type: DataTypes.TEXT, 
            allowNull: false,
        }, 
        user_id: {
            type: DataTypes.INT, 
            allowNull: false,
        },
    })    
      Cards.associate = (models) => {
        Cards.belongsTo(models.Users, {
          foreignKey: {
            allowNull: false,
          },
        });
      };
      return Cards;
}



