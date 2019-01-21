module.exports = (sequelize, DataTypes) => {
  const IdeaComment = sequelize.define('IdeaComment', {
    Comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  IdeaComment.associate = (models) => {
    // Associate comment back to idea
    IdeaComment.belongsTo(models.Idea, {
      foreignKey: 'Idea_ID',
    });

    // Associate comment back to user
    IdeaComment.belongsTo(models.User, {
      foreignKey: 'User_ID',
    });
  };

  return IdeaComment;
};
