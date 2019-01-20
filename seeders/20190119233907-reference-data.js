module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Status_Ref', [
      {
        Type: 'Project_Sts',
        Description: 'In Progress',
      },
      {
        Type: 'Project_Sts',
        Description: 'Completed',
      },
      {
        Type: 'Project_Sts',
        Description: 'Archived',
      },
    ], {});
  },
};
