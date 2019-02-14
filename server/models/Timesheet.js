module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define('Timesheet', {
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
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
  };

  return Timesheet;
};
