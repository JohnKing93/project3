module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Vote_Count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    Endorsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });

  return Idea;
};
