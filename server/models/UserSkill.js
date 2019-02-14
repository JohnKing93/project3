module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define('UserSkill', {
    skill: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        /*
          Composite table key where you can not have a user
          with a duplicate skill
        */
        unique: true,
        fields: ['skill', 'userID'],
      },
    ],
  });

  UserSkill.associate = (models) => {
    // Skills belong to a user
    UserSkill.belongsTo(models.User, {
      foreignKey: 'userID',
    });
  };

  return UserSkill;
};
