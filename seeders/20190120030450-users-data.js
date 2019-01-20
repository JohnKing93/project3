module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        First_Name: 'Chris',
        Last_Name: 'Human',
        Email: 'chuman@test.net',
        Position: 'Developer',
        Hours_Earned: 15.25,
        Hours_Redemmed: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        First_Name: 'Barbara',
        Last_Name: 'Hernandez',
        Email: 'bhernandez@test.net',
        Position: 'Project Manager',
        Hours_Earned: 5,
        Hours_Redemmed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        First_Name: 'Nadine',
        Last_Name: 'Hernandez',
        Email: 'nhernandez@test.net',
        Position: 'Graphic Designer',
        Hours_Earned: 10,
        Hours_Redemmed: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        First_Name: 'Johnny',
        Last_Name: 'King',
        Email: 'jking@test.net',
        Position: 'Developer',
        Hours_Earned: 0,
        Hours_Redemmed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
