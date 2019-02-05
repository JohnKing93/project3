module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Permission_Ref', [
      {
        description: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Supervisor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
