module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('RoleMembers', [
      {
        userID: 1,
        roleID: 1,
        statusID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 3,
        roleID: 1,
        statusID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
