module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Status_Ref', [
      {
        type: 'projectSts',
        description: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'projectSts',
        description: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'projectSts',
        description: 'Archived',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'userAppSts',
        description: 'Applied',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'userAppSts',
        description: 'Approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'userAppSts',
        description: 'Declined',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
