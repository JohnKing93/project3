module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    type: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
    },
    description: {
      trim: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Keep custom table name
    tableName: 'Status_Ref',
    indexes: [
      {
        /*
          Composite table key where you can not have a type
          with a duplicate description
        */
        unique: true,
        fields: ['type', 'description'],
      },
    ],
  });

  Status.associate = (models) => {
    // Project has one overall status
    Status.hasOne(models.Project, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });

    // Role Member has one overall status
    Status.hasOne(models.RoleMember, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });

    // Project role has one overall status
    Status.hasOne(models.ProjectRole, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });

    // Project Milestone has one overall status
    Status.hasOne(models.ProjectMilestone, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });

    // Incentive has one overall status
    Status.hasOne(models.Incentive, {
      foreignKey: {
        name: 'statusID',
        allowNull: false,
      },
    });
  };

  return Status;
};
