module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
      default: 'User',
    },
    hoursEarned: {
      type: DataTypes.FLOAT,
      default: 0,
    },
    hoursRedeemed: {
      type: DataTypes.FLOAT,
      default: 0,
    },
  });

  User.associate = (models) => {
    // User has a permission level
    User.belongsTo(models.Permission, {
      foreignKey: 'permissionID',
    });

    // User can have many ideas
    User.hasMany(models.Idea, {
      foreignKey: {
        name: 'ownerID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many comments on an idea
    User.hasMany(models.IdeaComment, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can vote on many ideas
    User.hasMany(models.IdeaVote, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many projects
    User.hasMany(models.Project, {
      foreignKey: {
        name: 'ownerID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many comments on an project
    User.hasMany(models.ProjectComment, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have a role on many projects
    User.hasMany(models.RoleMember, {
      as: 'Roles',
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can redeem many incentives
    User.hasMany(models.IncentiveRedeemed, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many timesheets
    User.hasMany(models.Timesheet, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many skills
    User.hasMany(models.UserSkill, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return User;
};
