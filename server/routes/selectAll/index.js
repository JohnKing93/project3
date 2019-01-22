const router = require('express').Router();
const db = require('../../models');

/* Functions to get all records for a given model */
const getAllUsers = (req, res) => {
  db.User.findAll({
    include: [db.Permission],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllIdeas = (req, res) => {
  db.Idea.findAll({
    include: [db.User],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllVotesByIdea = (req, res) => {
  db.IdeaVote.findAll({
    where: {
      ideaID: parseInt(req.params.id, 10),
    },
    order: ['ideaID', 'id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllCommentsByIdea = (req, res) => {
  db.IdeaComment.findAll({
    where: {
      ideaID: parseInt(req.params.id, 10),
    },
    order: ['ideaID', ['updatedAt', 'DESC']],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllProjects = (req, res) => {
  db.Project.findAll({
    include: [{
      model: db.Status,
      where: {
        type: 'projectSts',
      },
    }, db.User],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllProjectMembers = (req, res) => {
  db.ProjectMember.findAll({
    include: [{
      model: db.Status,
      where: {
        type: 'userAppSts',
      },
    },
    {
      model: db.Project,
      where: {
        id: req.params.id,
      },
    }, db.User],
    order: ['projectID', 'id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllCommentsbyProject = (req, res) => {
  db.ProjectComment.findAll({
    include: [{
      model: db.Project,
      where: {
        id: req.params.id,
      },
    }, db.User],
    order: ['projectID', 'id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllMilestonesbyProject = (req, res) => {
  db.ProjectMilestone.findAll({
    include: [{
      model: db.Project,
      where: {
        id: req.params.id,
      },
    },
    {
      model: db.Status,
      where: {
        type: 'milestoneSts',
      },
    }],
    order: ['projectID', 'id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllIncentives = (req, res) => {
  db.Incentive.findAll({
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllRedeemedIncentives = (req, res) => {
  db.IncentiveRedeemed.findAll({
    include: [db.Incentive, db.User],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllRedeemedIncentivesByUser = (req, res) => {
  db.IncentiveRedeemed.findAll({
    include: [{
      model: db.User,
      where: {
        id: req.params.id,
      },
    }, db.Incentive],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllPermissions = (req, res) => {
  db.Permission.findAll({
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllStatuses = (req, res) => {
  db.Status.findAll({
    order: ['type', 'description'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

// Route to retrieve all records for a given model
/* id is optional and should only be passed when looking for all
   votes/comments/milestones/members for an idea/project/incentive */
router.get('/:model/:id?', (req, res) => {
  switch (req.params.model) {
    case 'users':
      getAllUsers(req, res);
      break;
    case 'ideas':
      getAllIdeas(req, res);
      break;
    case 'projects':
      getAllProjects(req, res);
      break;
    case 'project-members':
      getAllProjectMembers(req, res);
      break;
    case 'project-comments':
      getAllCommentsbyProject(req, res);
      break;
    case 'project-milestones':
      getAllMilestonesbyProject(req, res);
      break;
    case 'votes':
      getAllVotesByIdea(req, res);
      break;
    case 'idea-comments':
      getAllCommentsByIdea(req, res);
      break;
    case 'incentives':
      getAllIncentives(req, res);
      break;
    case 'incentives-redeemed':
      getAllRedeemedIncentives(req, res);
      break;
    case 'incentives-redeemed-by-user':
      getAllRedeemedIncentivesByUser(req, res);
      break;
    case 'permissions':
      getAllPermissions(req, res);
      break;
    case 'status':
      getAllStatuses(req, res);
      break;
    default:
      res.status(404).end();
  }
});

module.exports = router;
