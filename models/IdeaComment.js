module.exports = (sequelize, DataTypes) => {
  const IdeaComment = sequelize.define('IdeaComment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  IdeaComment.associate = (models) => {
    // Associate comment back to idea
    IdeaComment.belongsTo(models.Idea, {
      foreignKey: 'ideaID',
    });

    // Associate comment back to user
    IdeaComment.belongsTo(models.User, {
      foreignKey: 'userID',
    });
  };

  return IdeaComment;
};
