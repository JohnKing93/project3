module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
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

  Status.associate = (models) => {
    // Project has one overall status
    models.Status.hasOne(models.Project, {
      foreignKey: {
        name: 'Status_ID',
        allowNull: false,
      },
    });
  };

  return Status;
};
