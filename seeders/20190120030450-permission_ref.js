module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Permission_Ref', [
      {
        Description: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Description: 'Supervisor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Description: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
