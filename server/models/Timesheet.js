module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define('Timesheet', {
    start: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tuesday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    wednesday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    thursday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    friday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    saturday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sunday: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Timesheet.associate = (models) => {
    // Associate timesheet back to user
    Timesheet.belongsTo(models.User, {
      foreignKey: 'ownerID',
    });

    // Associate timesheet back to project
    Timesheet.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });

    // Timesheet has a status level
    Timesheet.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });
  };

  return Timesheet;
};
