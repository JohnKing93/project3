module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Keep custom table name
    tableName: 'Status_Ref',
    indexes: [
      {
        unique: true,
        fields: ['Type', 'Description'],
      },
    ],
  });

  return Project;
};
