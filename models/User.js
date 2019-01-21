module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    First_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Last_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Hours_Earned: {
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0,
    },
    Hours_Redemmed: {
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0,
    },
  });

  User.associate = (models) => {
    // Associate user back to permissions
    models.User.belongsTo(models.Permission, {
      foreignKey: 'Permission_ID',
    });

    // User can own many ideas
    models.User.hasMany(models.Idea, {
      foreignKey: {
        name: 'Owner_ID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many idea comments
    models.User.hasMany(models.IdeaComment, {
      foreignKey: {
        name: 'User_ID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many votes
    models.User.hasMany(models.IdeaVote, {
      foreignKey: {
        name: 'User_ID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can own many projects
    models.User.hasMany(models.Project, {
      foreignKey: {
        name: 'Owner_ID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return User;
};
