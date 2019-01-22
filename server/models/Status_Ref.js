module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
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
        fields: ['type', 'description'],
      },
    ],
  });

  Status.associate = (models) => {
    // Project has one overall status
    models.Status.hasOne(models.Project, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });

    // Project Member has one overall status
    models.Status.hasOne(models.ProjectMember, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });

    // Project Milestone has one overall status
    models.Status.hasOne(models.ProjectMilestone, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });
  };

  return Status;
};
