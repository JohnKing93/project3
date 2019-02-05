module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('ProjectRoles', [
      {
        title: 'Test Role from Seeder',
        description: 'This is a test project role that was inserted from a seeder file.',
        projectID: 1,
        statusID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
