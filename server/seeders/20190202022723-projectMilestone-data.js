module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('ProjectMilestones', [
      {
        milestone: 'Test Milestone from Seeder',
        projectID: 1,
        statusID: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
