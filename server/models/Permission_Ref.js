module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    description: {
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
        fields: ['description'],
      },
    ],
  });

  Permission.associate = (models) => {
    // User has one overall permission level
    models.Permission.hasOne(models.User, {
      foreignKey: {
        name: 'permissionID',
        allowNull: false,
      },
    });
  };

  return Permission;
};
