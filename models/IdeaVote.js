module.exports = (sequelize, DataTypes) => {
  const IdeaVote = sequelize.define('IdeaVote', {});

  IdeaVote.associate = (models) => {
    // Associate vote back to idea
    IdeaVote.belongsTo(models.Idea, {
      foreignKey: 'Idea_ID',
    });

    // Associate vote back to user
    IdeaVote.belongsTo(models.User, {
      foreignKey: 'User_ID',
    });
  };

  return IdeaVote;
};
