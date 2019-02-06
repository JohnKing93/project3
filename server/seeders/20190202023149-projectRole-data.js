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
      {
        title: 'Test Role 2 from Seeder',
        description: 'This is a second test project role that was inserted from a seeder file.',
        projectID: 1,
        statusID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
