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

  return Project;
};
