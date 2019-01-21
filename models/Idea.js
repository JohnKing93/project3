module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Vote_Count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    Endorsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });

  Idea.associate = (models) => {
    // Associate idea back to user
    models.Idea.belongsTo(models.User, {
      foreignKey: 'Owner_ID',
    });

    // Idea can have many comments
    models.Idea.hasMany(models.IdeaComment, {
      foreignKey: {
        name: 'Idea_ID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Idea can have many votes
    models.Idea.hasMany(models.IdeaVote, {
      foreignKey: {
        name: 'Idea_ID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Idea;
};
