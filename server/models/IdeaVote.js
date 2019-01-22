module.exports = (sequelize, DataTypes) => {
  const IdeaVote = sequelize.define('IdeaVote', {});

  IdeaVote.associate = (models) => {
    // Associate vote back to idea
    IdeaVote.belongsTo(models.Idea, {
      foreignKey: 'ideaID',
    });

    // Associate vote back to user
    IdeaVote.belongsTo(models.User, {
      foreignKey: 'userID',
    });
  };

  return IdeaVote;
};
