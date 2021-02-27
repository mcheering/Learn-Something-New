//module of our cards table

module.exports = function (sequelize, DataTypes) {
      // we pass two arguments into Sequelize.define, the name of our model as a string, and an object describing our model's schema. Each property will represent a column in the db. 
      //Sequelize.define returns an object which we store inside the variable "User"
      let Cards = sequelize.define("Cards", {
            card_id: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true,
            },
            category: {
                  type: DataTypes.STRING,
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
                  type: DataTypes.INTEGER,
                  allowNull: false,
            },
      })
      Cards.associate = (models) => {
            Cards.belongsTo(models.User, {
                  foreignKey: {
                        allowNull: false,
                  },
            });
      };
      return Cards;
}
