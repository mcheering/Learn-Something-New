const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
      const User = sequelize.define('User', {
            user_id: {
                  type: DataTypes.INTEGER,
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

      User.prototype.validPassword = function (password) {
            return bcrypt.compareSync(password, this.password)
      }

      User.addHook('beforeCreate', function (user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
      })



      User.associate = (models) => {
            // Associating Author with Posts
            // When an Author is deleted, also delete any associated Posts
            User.hasMany(models.Cars, {
                  onDelete: 'cascade',
            })
      }

      return User
}
