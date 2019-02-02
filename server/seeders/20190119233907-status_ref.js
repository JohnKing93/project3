module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Status_Ref', [
      {
        type: 'project',
        description: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'project',
        description: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'project',
        description: 'Archived',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'projectRole',
        description: 'Open',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'projectRole',
        description: 'Closed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'roleMember',
        description: 'Applied',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'roleMember',
        description: 'Approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'roleMember',
        description: 'Declined',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'milestone',
        description: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'milestone',
        description: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
};
