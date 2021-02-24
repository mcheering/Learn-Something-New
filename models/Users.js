module.exports = (sequelize, DataTypes) => {
      const Users = sequelize.define('users', {
            user_id: {
                  type: DataTypes.INT,
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true
            },
            username: {
                  type: DataTypes.STRING,
                  allowNull: false,
                  validate: {
                        len: [6, 140]
                  }
            },
            password: {
                  type: DataTypes.STRING,
                  allowNull: false,
                  validate: {
                        len: [6, 140]
                  }
            }

      })

      Users.associate = (models) => {
            // Associating Author with Posts
            // When an Author is deleted, also delete any associated Posts
            Users.hasMany(models.Cars, {
                  onDelete: 'cascade',
            })
      }

      return Users
}
