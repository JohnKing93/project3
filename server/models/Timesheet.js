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

  return Timesheet;
};
