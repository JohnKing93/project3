module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Keep custom table name
    tableName: 'Permission_Ref',
    indexes: [
      {
        unique: true,
        fields: ['Description'],
      },
    ],
  });

  Permission.associate = (models) => {
    // User has one overall permission level
    models.Permission.hasOne(models.User, {
      foreignKey: {
        name: 'Permission_ID',
        allowNull: false,
      },
    });
  };

  return Permission;
};
