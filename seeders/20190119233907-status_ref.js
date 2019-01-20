module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Status_Ref', [
      {
        Type: 'Project_Sts',
        Description: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Type: 'Project_Sts',
        Description: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Type: 'Project_Sts',
        Description: 'Archived',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
