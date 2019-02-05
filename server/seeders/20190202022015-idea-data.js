module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Ideas', [
      {
        title: 'Test Idea from Seeder',
        description: 'This is a test idea that was inserted from a seeder file.',
        ownerID: 1,
        voteCount: 0,
        endorsed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
