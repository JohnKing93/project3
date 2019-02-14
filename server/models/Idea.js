module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    voteCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    endorsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });

  Idea.associate = (models) => {
    // Associate idea back to user
    Idea.belongsTo(models.User, {
      foreignKey: 'ownerID',
    });

    // Idea can have many comments
    Idea.hasMany(models.IdeaComment, {
      foreignKey: {
        name: 'ideaID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Idea can have many votes
    Idea.hasMany(models.IdeaVote, {
      foreignKey: {
        name: 'ideaID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Idea;
};
