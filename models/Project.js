module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  Project.associate = (models) => {
    // Associate project back to status
    models.Project.belongsTo(models.Status, {
      foreignKey: 'Status_ID',
    });

    // Associate project back to user
    models.Project.belongsTo(models.User, {
      foreignKey: 'Owner_ID',
    });
  };

  return Project;
};
