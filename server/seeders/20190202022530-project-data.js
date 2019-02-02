module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Projects', [
      {
        title: 'Test Project from Seeder',
        description: 'This is a test project that was inserted from a seeder file.',
        ownerID: 1,
        statusID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
