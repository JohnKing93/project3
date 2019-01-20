module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define('Timesheet', {
    Start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    End: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Timesheet;
};
