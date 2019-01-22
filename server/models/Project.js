module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  Project.associate = (models) => {
    // Associate project back to status
    models.Project.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate project back to user
    models.Project.belongsTo(models.User, {
      foreignKey: 'ownerID',
    });
  };

  return Project;
};
